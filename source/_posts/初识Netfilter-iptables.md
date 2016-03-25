title: 初识Netfilter/iptables
tags:
  - iptables
  - Netfilter
  - 防火墙
  - 网络
categories:
  - Linux防火墙
date: 2016-03-25 20:49:54
---


### 一、什么是Netfilter/iptables？

{% blockquote 维基百科 https://zh.wikipedia.org/wiki/Iptables%}

iptables是一个运行在用户空间的应用软件，通过控制Linux内核netfilter模块，来管理网络数据包的流动与转送。在大部分的Linux系统上面，iptables是使用/usr/sbin/iptables来操作，文件则放置在手册页底下，可以通过 man iptables 指令获取。通常iptables都需要内核层级的模块来配合运作，Xtables是主要在内核层级里面iptables API运作功能的模块。因相关动作上的需要，iptables的操作需要用到超级用户的权限。

目前iptables系在2.4、2.6及3.0的内核底下运作，旧版的Linux内核（2.2）使用ipchains及ipwadm（Linux 2.0）来达成类似的功能，2014年1月19日起发行的新版Linux内核（3.13后）则使用nftables取而代之。

{% endblockquote %}
<!-- more -->
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

{% asset_img Netfilter与iptabales关系.png Netfilter与iptabales关系 %}

为了方便处理用户命令的一组有序控制策略，iptables使用table、chain、rule来表示一条策略。其中table与Netfilter中的各模块中维护的全局表进行对应，chain与挂载点（即钩子）相对应，rule处理规则。iptables策略组成如图：

{% asset_img iptables策略组成.png iptables策略组成 %}

### 二、 iptables命令格式

iptables命令语法：
``` bash
iptables [-t 表名] 命令 [条件匹配] [目标]
```
下面是更加详细的命令格式：
``` bash
iptables [ -t 表名] 命令选项 [链名] [条件匹配] [-j 目标动作或跳转] 
```

#### 1.表名
有四张表：filter(默认值)、NAT、mangle、raw。

#### 2.命令选项
|选项名			|功能说明|
|:-------------:|-------|
|-A				|在指定链的末尾添加（--append）一条新的规则|
|-D				|删除（--delete）指定链中的某一条规则，按规则序号或内容确定要删除的规则|
|-I				|在指定链中插入（--insert）一条新的规则，默认在链的开头插入|
|-R				|修改、替换（--replace）指定链中的一条规则，按规则序号或内容确定|
|-L				|列出（--list）指定链中的所有的规则进行查看，默认列出表中所有链的内容|
|-F				|清空（--flush）指定链中的所有规则，默认清空表中所有链的内容|
|-N				|新建（--new-chain）一条用户自己定义的规则链|
|-X				|删除指定表中用户自定义的规则链（--delete-chain）|
|-P				|设置指定链的默认策略（--policy）|
|-n				|用数字形式（--numeric）显示输出结果，若显示主机的 IP地址而不是主机名|
|-P				|设置指定链的默认策略（--policy）|
|-v				|查看规则列表时显示详细（--verbose）的信息|
|-V				|查看iptables命令工具的版本（--Version）信息|
|-h				|查看命令帮助信息（--help）|
|--line-number	|查看规则列表时，同时显示规则在链中的顺序号|

#### 3.链名
通过之前分析，主要有一下五条链：
1. PREROUTING：与NF_INET_PRE_ROUTING钩子相对应，此链的处理时机也与NF_INET_PRE_ROUTING的时机相对应。
2. INPUT：与NF_INET_LOCAL_IN钩子相对应，此链的处理时机也与NF_INET_LOCAL_IN的时机相对应。
3. FORWARD：与NF_INET_LOCAL_OUT钩子相对应，此链的处理时机也与NF_INET_LOCAL_OUT的时机相对应。
4. OUTPUT：与NF_INET_LOCAL_OUT钩子相对应，此链的处理时机也与NF_INET_LOCAL_OUT的时机相对应。
5. POSTROUTING：与NF_INET_POST_ROUTING钩子相对应，此链的处理时机也与NF_INET_POST_ROUTING的时机相对应。

#### 4.匹配条件

##### 1）通用匹配
|匹配参数	|参数说明|
|:---------:|-------|
|-p			|指定规则协议，如tcp, udp,icmp等，可以使用all来指定所有协议|
|-s			|指定数据包的源地址参数，可以使IP地址、网络地址、主机名|
|-d			|指定目的地址|
|-i			|输入接口|
|-o			|输出接口|

##### 2）隐含匹配

{% asset_img 隐含匹配.jpg 隐含匹配 %}

##### 3）显式匹配

{% asset_img 显式匹配.jpg 显式匹配 %}

#### 5.目标动作或跳转
|目标项           |功能说明|
|:--------------:|-------|
|ACCEPT	|当信息包与具有ACCEPT目标的规则完全匹配时，会被接受（允许它前往目的地）|
|DROP	|当信息包与具有DROP目标的规则完全匹配时，会阻塞该信息包，并且不对它做进一步处理。该目标被指定为-j DROP|
|REJECT	|该目标的工作方式与DROP目标相同，但它比DROP好。和DROP不同，REJECT不会在服务器和客户机上留下死套接字。另外，REJECT将错误消息发回给信息包的发送方。该目标被指定为-j REJECT|
|RETURN	|在规则中设置的RETURN目标让与该规则匹配的信息包停止遍历包含该规则的链。如果链是如INPUT之类的主链，则使用该链的默认策略处理信息包。它被指定为-jump RETURN|
|LOG	|表示将包的有关信息记录入日志|
|TOS	|表示改写数据包的TOS值|

### 三、  iptables应用

1. 删除iptables现有规则
``` bash
iptables –F
```
2. 查看iptables规则
``` bash
iptables –L (iptables –L –v -n)
```
3. 增加一条规则到最后
``` bash
iptables -A INPUT -i eth0 -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT
```
4. 添加一条规则到指定位置
``` bash
iptables -I INPUT 2 -i eth0 -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT 
```
5.  删除一条规则
``` bash
iptabels -D INPUT 2 
```
6. 修改一条规则
``` bash
iptables -R INPUT 3 -i eth0 -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT 
```
7. 设置默认策略
``` bash
iptables -P INPUT DROP 
```

### 四、实战——使用iptables的源地址转发功能

上面就是一些简单的介绍，下面模拟内网通过网关访问外网的一个简单例子来看看iptables的应用。

#### 1.准备：
1. 用虚拟机开启两台机器，分别命名为VM1（Virtual Machine 1）和VM2，VM2当作局域网内的机器，VM2当作网关，真实机器（即本机）LM（Local Machine）当作外网；
2. 现在分别为VM1配置网络，ip地址是192.186.10.1，掩码是255.255.255.0；VM2配置两网卡，网络配置分别为：网卡1：ip地址是192.168.10.2，掩码是255.255.255.0，网卡2：ip地址是10.126.72.203，掩码是255.255.255.0；LM的网络配置是：ip地址是10.126.72.23，掩码是255.255.255.0。
3. 在LM上搭建一个web服务器，配置网址www.LM.com。

注意：怎么配置两台虚拟机在同一个局域网内，以及如何配置本机和虚拟机在同一网络中并相互访问呢？

这里备注一下：下面的配置均是以VirtualBox为例。

1. 配置虚拟机局域网

{% asset_img 虚拟机网络配置1.png 虚拟机网络配置1 %}

{% asset_img 虚拟机网络配置2.png 虚拟机网络配置2 %}

2. 配置本机和虚拟机在同一网络中并相互访问
{% asset_img 虚拟机网络配置3.png 虚拟机网络配置3 %}

准备工作基本完成，如果顺利的话，最后将得到如下网络：

{% asset_img 模拟网络.png 模拟网络 %}

#### 2.实现VM1通过VM2访问LM

由于LM的Web服务(www.lm.com)是本地服务并没有申请域名，还需要手动在VM1和VM2主机的/etc/hosts中添加如下一语句，否则无法对其进行域名解析：

``` bash
10.126.72.23     www.lm.com
```

毋庸置疑，开始VM1无法访问LM的Web服务（www.lm.com）。

{% asset_img 访问LM服务1.png 访问LM服务1 %}

下面将实现此访问。

1. 首先开启内核转发的模块
向/etc/sysctl.conf文件添加或这修改net.ipv4.ip_forward的值为1（即net.ipv4.ip_forward = 1）：
``` bash
sudo vim /etc/sysctl.conf
```

2. 设置VM1的默认网关为VM2，即192.168.10.2，

{% asset_img 设置默认网关.png 设置默认网关 %}

3. 在VM2上安装iptables及服务（此处系统为CentOS 7），并启动
``` bash
sudo yum -y install iptables
sudo yum -y install iptables-services
sudo systemctl start iptables.service 
```

4. 配置iptables策略
``` bash
sudo iptables -F
sudo iptalbes -t nat -F
sudo iptables -t nat -A POSTROUTING -s 192.168.10.1/32 -j SNAT --to 10.126.72.203 
```

这就可以实现VM1访问LM上的服务了。

{% asset_img 访问LM服务2.png 访问LM服务2 %}


### 五、小结

以上简单的介绍了iptable的基本概念和基本命令，以及命令的简单使用。这只是冰山一角，iptables还能实现如下功能：
1. 建立一个基于有状态和无状态的包过滤规则的因特网防火墙。
2. 部署高度可用的有状态和无状态防火墙集群。
3. 当公网ip不够用时，可以进行ip伪装，属于NAT模块。
4. 使用NAT来实现透明代理。
5. 辅助内核网络模块中的tc和iproute2去构造一个复杂的QoS和路由策略。
6. 做进一步处理比如比如更改IP包头中的TOS/DSCP/ECN参数。


### 参考文章
[Iptables入门教程](http://drops.wooyun.org/tips/1424)
[Netfilter---框架的设计](http://blog.chinaunix.net/uid-20786208-id-3429074.html)
[iptables防火墙原理详解](http://seanlook.com/2014/02/23/iptables-understand/)
[iptables深入解析](http://blog.jobbole.com/?s=iptables%E6%B7%B1%E5%85%A5%E8%A7%A3%E6%9E%90)
[Linux内核工程导论——网络：Netfilter概览](http://blog.csdn.net/ljy1988123/article/details/50458044?utm_source=tuicool&utm_medium=referral)
[Netfilter/iptables框架总结](http://vinllen.com/netfilteriptableskuang-jia-zong-jie/)
