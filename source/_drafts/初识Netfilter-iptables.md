title: 初识Netfilter/iptables
tags:
  - iptables
  - 防火墙
categories:
  - Linux防火墙——iptables
---

### 一、什么是iptables？

{% blockquote 维基百科 https://zh.wikipedia.org/wiki/Iptables%}

iptables是一个运行在用户空间的应用软件，通过控制Linux内核netfilter模块，来管理网络数据包的流动与转送。在大部分的Linux系统上面，iptables是使用/usr/sbin/iptables来操作，文件则放置在手册页底下，可以通过 man iptables 指令获取。通常iptables都需要内核层级的模块来配合运作，Xtables是主要在内核层级里面iptables API运作功能的模块。因相关动作上的需要，iptables的操作需要用到超级用户的权限。

目前iptables系在2.4、2.6及3.0的内核底下运作，旧版的Linux内核（2.2）使用ipchains及ipwadm（Linux 2.0）来达成类似的功能，2014年1月19日起发行的新版Linux内核（3.13后）则使用nftables取而代之。

{% endblockquote %}

这就是中文维基百科上给出的定义，看完后，仍然不知所云，iptables的用途到底是什么？通过管理网络数据包的流动和转送，能够实现什么样的功能？

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
