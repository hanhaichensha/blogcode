title: Libgingle学习笔记（1）
tags:
  - Libjingle
  - P2P
categories:
  - Libjingle
---

## 一、Libjingle中机制和技术

### 1.1、信号-槽机制（Signal-Slot）

信号槽机制与Windows下的消息机制类似，消息机制是基于回调函数，而信号槽是使用槽来代替函数指针。

1. **信号**  
信号通常是作为对象的成员(信号类型：sigslot::signalX<>)出现，当对象的状态发生改变，对象可以发送信号，对象只负责发送信号，对于谁去接收和处理这个信号，它并不关心。  
2. **槽**  
槽是继承自sigslot::has_slots<>类对象的普通成员函数。槽并不知道自己是否与信号相连接，它不需要了解具体的通信机制，只需做好自己的功能即可。  
3. **信号于槽的连接**  
由于信号和槽是一种弱耦合的方式存在，他们并不关心对方的具体实现，它们是通过信号对象的connect方法将两者进行关联。

例如:
1、信号类，包括信号对象和信号发送函数：
```
#include "sigslot.h"

class Sender  
{
public:
    // 定义信号，该信号有两个参数
    sigslot::signal2< std::string , int > SignalDanger;
    
    // 该函数发送消息
    void Panic()
    {
        SignalDanger("Help!", 0); 
    }
};
```
2、槽函数类:
```
class Receiver : public sigslot::has_slots<>
{
public:
    // 接收SignalDanger 信号的函数，该函数参数必须和信号的参数一致
    void OnDanger(std::string message, int time)
    {
        printf("I heard something like "%s" at %d!n", message.c_str(), time);
    }
};
```
3、信号槽的连接断开连接：
```
Sender sender;
Receiver receiver;

// 将发送者的信号连接到接收方的接收函数上；和断开连接
sender.SignalDanger.connect(&receiver, Receiver::OnDanger);

sender.SignalDanger.disconnect(&receiver);
```
4、状态改变，发送信号：
```
void OnStateChange() 
{
	sender.Panic();
}
```

**libjingle命名规则：**  
信号命名：signal....  
收到信号：on...


### 1.2、Threads、signaling thread和worker thread
Libjingle支持多线程来提高应用程序性能。Libjingle组件使用1个或者2个全局线程：
- **signaling thread**  
此线程用于创建基础部件，如：Session Management、Control和XMPP Messaging部件。
- **worker thread**  
此线程(在代码中，有时也叫做channel Thread)被P2P组件对象用于处理资源密集型处理过程，比如：数据流。把这些处理密集型资源放到独立线程中进行处理，可避免数据流阻塞或者XMPP组件和用户界面阻塞。在ChannelManager、SocketMonitor、P2PTransportChannel和Port对象会使用worker thread(工人线程)。为了使用signaling thread线程，你在SessionManager的构造函数中创建并传入一个新的线程，如果不传入一个新的线程，SessionManager内部会默认创建一个worker thread（工人线程）。CallClient::InitPhone有一个在底层组件中创建worker thread的例子。

此外，Libjingle现在提供了一个SignalThread基类。扩展这个类可以使存在于它自身线程上的一个对象能够实例化，启动和独立完成并删除自身。  
  
注意：尽管Libjingle支持多线程，但是只有在必要的方法中支持通过验证调用线程来确保线程安全，并且仅有少部分方法使用了锁。下面是一个验证是哪个线程调用此方法的例子：  
```
// Check that we're being called from the channel (e.g., worker) thread.
ASSERT(talk_base::Thread::Current() == channel_thread_);
channel_thread_->Clear(this);
```
Libjingle使用talk_base::Thread对象（或者他的继承对象）来封装所有线程，包括signaling thread、worker thread以及其他线程。线程对象是用ThreadManager进行管理，在需要时取得线程。SessionManager在它实例化的时候，调用ThreadManager::CurrentThread为其提供一个signaling thread（和一个worker thread，在什么也没有提供的情况下）；XmppPump使用当前线程当做signaling thread。因此，为了创建signaling thread，在创建SessionManager对象之前，或者在期望XmppPump开始工作之前，必须创建一个Thread对象（或者继承对象）并将其压入ThreadManager的线程池。有两种创建线程的方法：
- **AutoThread**：通过使用Libjingle Thread对象封装了现存系统的thread，并将其设置为ThreadManager对象线程池中的当前线程（即：当调用Thread::CurrentThread时返回新建的线程）。
- **Thread**：此方法会创建和封装一个线程，此线程通常作为worker thread。为了使用这种线程，你必须创建一个新的Thread对象，调用ThreadManager::Add或者ThreadManager::SetCurrent将其添加到线程池，然后调用Run开启并进入阻塞循环，或者调用Start开启线程侦听。

线程为对象之间（或者对象内部）的消息提供了通道。例如，SocketManager在另一个线程上向自己发送消息以销毁套接字，或者在生成连接候选时向SessionManager发送消息。Thread继承自MessageQueue，同时他们都公开了Send、Post和其他同步和异步发送消息的方法。一个能接收使用MessageQueue发送的消息的对象，必须继承并实现MessageHandler。MessageHandler定义了一个OnMessage发放，此方法在MessageQueue消息中调用。

你可以通过任意线程发送消息到任何继承自talk_base::MessageHandler的对象。但是，如果发送消息以执行资源密集型线程，则应通过工作线程发送消息。您可以通过调用SessionManager::worker_thread()获取worker thread的句柄。你可以通过调用SessionManager::signal_thread()来获得signaling thread的句柄。  

对象有几种方法来访问特定的线程：它可以请求和存储线程指针作为输入参数;它可以假设当前线程创建时（由ThreadManager :: CurrentThread在其构造函数中访问）是一个特定的线程并缓存一个成员指针;它可以调用SessionManger :: signal_thread（）或SessionManager :: worker_thread（）来检索线程。所有这三种技术都在libjingle中使用。

因为一个对象可以在任何线程上被调用，一个对象可能需要验证一个方法被调用的线程。为此，调用Thread::Current（检索当前线程）并将该值与已知线程进行比较 - 这个线程可以是SessionManager公开的线程之一，或者对象在构造函数中存储的指向其初始线程的指针。这里是一个更扩展的例子，在另一个线程上的同一个对象中调用一个方法。

```
// Note that worker_thread_ is not initialized until someone 
// calls PseudoTcpChannel::Connect
// Also note that this method *is* thread-safe. 
bool PseudoTcpChannel::Connect(const std::string& channel_name) {
  ASSERT(signal_thread_->IsCurrent());
  CritScope lock(&cs_);
    if (channel_)
      return false;
    ASSERT(session_ != NULL);
    worker_thread_ = session_->session_manager()->worker_thread();
...
}

void PseudoTcpChannel::SomeFunction(){
  ...
  // Post a message to yourself over the worker thread.
  worker_thread_->Post(this, MSG_PING); // <- Goes in here....
  ...
}

// Handle queued requests.
void PseudoTcpChannel::OnMessage(Message *pmsg) {
  if (pmsg->message_id == MSG_SORT)
    OnSort();
  else if (pmsg->message_id == MSG_PING) // -> And comes out here!
    // Check that we're in the worker thread before proceding.
    ASSERT(worker_thread_->IsCurrent());
    OnPing();
  else if (pmsg->message_id == MSG_ALLOCATE)
    OnAllocate();
  else
    assert(false);
}
```

### 1.3、处理同步\异步的多线程处理机制
在Libjingle中，既支持异步模式，也支持同步模式，如Windows中的窗口消息处理机制，有PostMessage，又有SendMessage。

### 1.4、为了屏蔽各平台网络接口的差异，大量使用了适配器模式
适配器模式可以将一杯类的接口适配成统一的接口，屏蔽底层的差异性。在Libjingle中主要使用在套接字的接口，和SSL接口，这些接口在Windows和Linux中有所差异。

### 1.5、 P2P网络传输和NAT打洞技术
Libjingle使用了NAT打洞技术实现P2P网络传输，包括：多人语音、多人视频，P2P文件共享等。

{% asset_img 图一.gif 图一 %}

## 二、Libjingle整体架构
### 2.1、 Libjingle整体架构图

{% asset_img 图二.gif 图二 %}

### 2.2 Application模块

## 参考资料
1、[Important Concepts](https://developers.google.cn/talk/libjingle/important_concepts)
2、[Libjingle中重要概念](http://blog.csdn.net/miky_sun/article/details/4929939)
3、[libjingle源码解析(1)--从libjingle里能借鉴什么？](http://blog.csdn.net/leehark/article/details/7216914)
4、[http://blog.csdn.net/leehark/article/details/7234884](http://blog.csdn.net/leehark/article/details/7234884)
