title: 初识Netfilter/iptables
tags:
  - iptables
  - Netfilter
  - 防火墙
  - 网络
categories:
  - Linux防火墙
---

### 一、什么是Netfilter/iptables？

{% blockquote 维基百科 https://zh.wikipedia.org/wiki/Iptables%}

iptables是一个运行在用户空间的应用软件，通过控制Linux内核netfilter模块，来管理网络数据包的流动与转送。在大部分的Linux系统上面，iptables是使用/usr/sbin/iptables来操作，文件则放置在手册页底下，可以通过 man iptables 指令获取。通常iptables都需要内核层级的模块来配合运作，Xtables是主要在内核层级里面iptables API运作功能的模块。因相关动作上的需要，iptables的操作需要用到超级用户的权限。

目前iptables系在2.4、2.6及3.0的内核底下运作，旧版的Linux内核（2.2）使用ipchains及ipwadm（Linux 2.0）来达成类似的功能，2014年1月19日起发行的新版Linux内核（3.13后）则使用nftables取而代之。

{% endblockquote %}

以上就是中文维基百科上给出的定义，看完后，仍然不知所云，iptables的功能具体是什么？它与NetFilter是什么关系？

iptables是用来管理网络数据包的流动和转送的，也就是控制数据包的流向。我们都知道网络数据包在流经一台电脑时，数据包一般只有两种流向，一是目的地址是本机的：网卡驱动接收数据包->路由程序处理->本地协议栈处理->网卡驱动发送数据包；另一种流向是目的地址不是本机：网卡驱动接收数据包->路由程序处理数据包->将数据包转送到另一网卡->网卡驱动发送数据包。为了能灵活的管理数据包，Linux内核使用Netfilter模块在这些主要流向的路径的关键位置添加了一些钩子。如下图：

{% asset_img Netfilter-packet-flow.png Netfilter-packet-flow %}

上图过于复杂，为了便于理解，使用下面简化版的流程：

{% asset_img iptables数据包流程.png iptables数据包流程 %}

从上图可知，Netfilter在几个固定的位置设置了5个钩子：

1. NF_INET_PRE_ROUTING:在网卡接收到数据包后，进入路由选择之前；
2. NF_INET_LOCAL_IN:在路由判断目的地址是本机之后，交给本地协议栈处理之前；
3. NF_INET_FORWARD:在路由判断目的地址不是本机之后，交给另一个网卡发送之前；
4. NF_INET_LOCAL_OUT:在本地协议栈和应用程序处理之后，交给网卡发送之前；
5. NF_INET_POST_ROUTING:在交给网卡发送之前，这是数据流中的最后一个钩子。

既然有钩子，就可以定义与之对应的处理函数，这些函数也已经在Netfilter中定义好，并且与钩子绑定了。感觉所有的活，Netfilter都已经做好了，还有iptables什么事呢？

其实不然，先来看看Netfilter的四个基本模块：
1. conntrack模块：连接追踪模块
2. Filter模块：过滤模块
3. Nat模块：地址转换模块
4. Mangle模块：数据包修改模块
其中conntrack模块是基础核心模块，而其他几个模块是在此模块的基础上，维护一张全局表，以实现各模块相应的功能。为了灵活的管理数据包，iptables就可以调用Netfilter提供的接口想这些全局表中添加相应的控制条件和处理。以此，Netfilter其实就是提供一组系统调用以实现管理网络数据包流动和转送的框架。

而iptables则是提供命令处理的用户空间应用程序，同时提供了一些扩展模块以加载到内核对数据包进行处理。Netfilter和iptables的关系如图：



如果所有东西都在Netfilter中写死了，对于应对各种复杂的数据包控制是无法做到的。因此，其实Netfilter定义了一些

要回答这个问题，就得先弄明白管理网络数据包的流动和转送指的是什么？

管理网络数据包的流动和转送：包括对网络数据包的分析，通过分析控制数据包的流向，甚至可以对数据包的进行修改，从而改变数据包的流向。在网络安全领域中，为了保证网络安全，我们也同样需要对数据包进行分析、过滤等。在网络中有这么一种需求，为多人局域网分配一个公共IP来访问公共网络，这就要求将局域网内的局域网ip地址转换成公共ip地址来访问公共网络，这叫地址转换，这里通过修改网络数据包中的ip地址能够实现地址转换
功能。

所以，iptables能够实现如下功能：
* 实现防火墙功能
* 实现网络地址转换功能（Network Address Translate）
* 实现数据包的内容修改

通过定义知道iptables自己并没有这些功能，它是通过控制Linux内核Netfilter模块来实现这些功能，所以有必要了解一下Netfilter。













### 参考文章
[Netfilter---框架的设计](http://blog.chinaunix.net/uid-20786208-id-3429074.html)

[iptables防火墙原理详解](http://seanlook.com/2014/02/23/iptables-understand/)

[iptables深入解析](http://blog.jobbole.com/?s=iptables%E6%B7%B1%E5%85%A5%E8%A7%A3%E6%9E%90)

[Linux内核工程导论——网络：Netfilter概览](http://blog.csdn.net/ljy1988123/article/details/50458044?utm_source=tuicool&utm_medium=referral)

[netfilter-在内核态操作网络数据包](http://www.cnblogs.com/yuuyuu/p/5184509.html?utm_source=tuicool&utm_medium=referral)

[Netfilter/iptables框架总结](http://vinllen.com/netfilteriptableskuang-jia-zong-jie/)