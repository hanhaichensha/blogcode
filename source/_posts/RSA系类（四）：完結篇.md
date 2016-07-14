title: RSA系类（四）：完結篇
tags:
  - RSA算法
  - 数学
  - 欧拉函数
  - 费马小定理
categories:
  - 算法
date: 2015-02-04 23:53:00
---


昨天说到费马小定理可以表述成：如果 m 是一个质数的话，那么对于任意一个整数 n ，随着 i（<embed src="http://latex.codecogs.com/svg.latex?{i\in n^{0}} " type="image/svg+xml" />）的增加， n 的 i 次方除以 m 的余数将会呈现出长度为 m–1 的周期性。然后我们还提出了另一个问题，如果m不是质数，那么对于任意一个整数 n ，随着 i 的增加， n 的 i 次方除以 m 的余数将会呈现出多长的周期性呢？

记<embed src="http://latex.codecogs.com/svg.latex?{\varphi(m)} " type="image/svg+xml" />为对于任意一个整数 n ，随着 i（<embed src="http://latex.codecogs.com/svg.latex?{i\in n^{0}} " type="image/svg+xml" />）的增加，n 的 i 次方除以 m 的余数的周期。

1.现在我们先来看一下这种情况，如果m=p×q，其中p和q互质，由中国剩余定理可以可知：任意整数对m求余的余数和这个数分别对p、q求余组成的余数数对是一一对应关系。因此，对于任意一个整数 n ，随着 i 的增加， n 的 i 次方除以 m 的余数与n 的 i 次方分别除以p、q而组成的余数数对的周期性是一致的。而n 的 i 次方除以p的周期性可以根据费马小定理得（p-1），同理，可得n 的 i 次方除以q的周期性是（q-1）。那么(p-1)×(q-1)就是n 的 i 次方除以 m 的余数的一个周期，请注意，这里说的是一个周期，并没说是最小正周期，最小正周期一概是（p-1）和（q-1）的最小公倍数才对。为了方便，我只求出周期即可，所以通常只要(p-1)×(q-1)就行了。

通过上面的分析可得：

#### 结论一：当m=p×q，其中p和q都是互质，<embed src="http://latex.codecogs.com/svg.latex?{\varphi(m)=(p-1)×(q-1)} " type="image/svg+xml" />。

2.如果<embed src="http://latex.codecogs.com/svg.latex?{m=p^{k}} " type="image/svg+xml" />，其中p是质数，k是正整数。

我们先来看一张表：

| i        | 0 | 1 |...| p |p+1|...| 2p|2p+1|...|<embed src="http://latex.codecogs.com/svg.latex?{p^{k}-1} " type="image/svg+xml" />|
| :-------:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:--:|:-:|:-:|
| i mod p  | 0 | 1 |...| 0 | 1 |...| 0 | 1  |...|p-1|
| i mod <embed src="http://latex.codecogs.com/svg.latex?{p^{k}} " type="image/svg+xml" /> | 0 | 1 |...| p |p+1|...| 2p|2p+1|...|<embed src="http://latex.codecogs.com/svg.latex?{p^{k}-1} " type="image/svg+xml" />|
| i        |<embed src="http://latex.codecogs.com/svg.latex?{p^{k}} " type="image/svg+xml" />|<embed src="http://latex.codecogs.com/svg.latex?{p^{k}+1} " type="image/svg+xml" />|...|<embed src="http://latex.codecogs.com/svg.latex?{p^{k}+p} " type="image/svg+xml" />|<embed src="http://latex.codecogs.com/svg.latex?{p^{k}+p+1} " type="image/svg+xml" />|...|<embed src="http://latex.codecogs.com/svg.latex?{p^{k}+2p} " type="image/svg+xml" />|<embed src="http://latex.codecogs.com/svg.latex?{p^{k}+2p+1} " type="image/svg+xml" />|...|<embed src="http://latex.codecogs.com/svg.latex?{2p^{k}-1} " type="image/svg+xml" />|
| i mod p  | 0 | 1 |...| 0 | 1 |...| 0 | 1  |...|p-1|
| i mod <embed src="http://latex.codecogs.com/svg.latex?{p^{k}} " type="image/svg+xml" /> | 0 | 1 |...| p |p+1|...| 2p|2p+1|...|<embed src="http://latex.codecogs.com/svg.latex?{p^{k}-1} " type="image/svg+xml" />|

因为任意一个整数对p求余的余数的周期是p，任意一个整数对<embed src="http://latex.codecogs.com/svg.latex?{p^{k}} " type="image/svg+xml" />求余的余数的周期是<embed src="http://latex.codecogs.com/svg.latex?{p^{k}} " type="image/svg+xml" />，刚好是对p求余的余数的周期的倍<embed src="http://latex.codecogs.com/svg.latex?{p^{k-1}} " type="image/svg+xml" />。由此可得：n 的 i 次方除以<embed src="http://latex.codecogs.com/svg.latex?{p^{k}} " type="image/svg+xml" />的余数周期正好是n 的 i 次方除以p周期的<embed src="http://latex.codecogs.com/svg.latex?{p^{k-1}} " type="image/svg+xml" />倍。n 的 i 次方除以p周期可以由费马小定理得到，是(p-1)，因此：

#### 结论二：当<embed src="http://latex.codecogs.com/svg.latex?{m=p^{k}} " type="image/svg+xml" />，其中p是质数，k是正整数时，<embed src="http://latex.codecogs.com/svg.latex?{\varphi(m)=(p-1)\bullet p^{k-1}} " type="image/svg+xml" />。

3.如果<embed src="http://latex.codecogs.com/svg.latex?{m=p_1^{k_1}p_2^{k_2}\cdots p_r^{k_r}}" type="image/svg+xml" />，其中是质数<embed src="http://latex.codecogs.com/svg.latex?{p_i}" type="image/svg+xml" />，<embed src="http://latex.codecogs.com/svg.latex?{k_i}" type="image/svg+xml" />是正整数，<embed src="http://latex.codecogs.com/svg.latex?{i\in[1,r]}" type="image/svg+xml" />；

由于<embed src="http://latex.codecogs.com/svg.latex?{p_i}" type="image/svg+xml" />都是质数，所以<embed src="http://latex.codecogs.com/svg.latex?{p_i^{k_i}}" type="image/svg+xml" />之间彼此都没有相同的质因数，即<embed src="http://latex.codecogs.com/svg.latex?{p_i^{k_i}}" type="image/svg+xml" />两两互质。根据结论一可以知道<embed src="http://latex.codecogs.com/svg.latex?{\varphi(m)=\varphi(p_1^{k_1}p_2^{k_2}\cdots p_r^{k_r})=\varphi(p_1^{k_1})\bullet\varphi(p_2^{k_2})\bullet\cdots\bullet\varphi(p_r^{k_r})}" type="image/svg+xml" />，根据结论二得：<embed src="http://latex.codecogs.com/svg.latex?{\varphi(p_i^{k_i})=p_i^{k_i-1}\bullet(p_i-1})=p_i^{k_i}\bullet(1-1/p_i)}" type="image/svg+xml" />，

由此可得：
#### 结论三：当<embed src="http://latex.codecogs.com/svg.latex?{m=p_1^{k_1}p_2^{k_2}\cdots p_r^{k_r}}" type="image/svg+xml" />，其中<embed src="http://latex.codecogs.com/svg.latex?{p_i}" type="image/svg+xml" />是质数，<embed src="http://latex.codecogs.com/svg.latex?{k_i}" type="image/svg+xml" />是正整数，<embed src="http://latex.codecogs.com/svg.latex?{i\in[1,r]}" type="image/svg+xml" />，<embed src="http://latex.codecogs.com/svg.latex?{\varphi(m)&=&\prod_{i=1}^{r}p_i^{k_i-1}(p_i-1)&=&m\prod_{i=1}^{r}(1-1/p_i)}" type="image/svg+xml" />，而所有的整数都能表示成<embed src="http://latex.codecogs.com/svg.latex?{m=p_1^{k_1}p_2^{k_2}\cdots p_r^{k_r}}" type="image/svg+xml" />，即：对于任意的整数m，都有<embed src="http://latex.codecogs.com/svg.latex?{\varphi(m)&=&\prod_{i=1}^{r}p_i^{k_i-1}(p_i-1)&=&m\prod_{i=1}^{r}(1-1/p_i)}" type="image/svg+xml" />。

这个结果正好就是[欧拉函数](https://zh.wikipedia.org/wiki/欧拉函数)。

由于结论一和结论二都是结论三的特例，从而有结论：
#### 结论四：对任意正整数n 的 i 次方除以 m 的余数将会呈现出长度<embed src="http://latex.codecogs.com/svg.latex?{\varphi(m)&=&\prod_{i=1}^{r}p_i^{k_i-1}(p_i-1)&=&m\prod_{i=1}^{r}(1-1/p_i)}" type="image/svg+xml" />的周期。即<embed src="http://latex.codecogs.com/svg.latex?{n^{\varphi(m)+1}&\equiv&n(\mod m)}" type="image/svg+xml" />。

如果n和m互质，也就是下面第三个原理中的(n，m)=1的含义，根据下面除法原理的第三个原理，

<embed src="http://latex.codecogs.com/svg.latex?{(1):a\equiv b(\mod cn)\Rightarrow a\equiv b(\mod n)}\\{(2):\left.\begin{aligned}a\equiv b(\mod m)\\n|m\end{aligned}\right\}\Rightarrow a\equiv b(\mod n)}\\{(3):\left.\begin{aligned}ac \equiv bc(\mod m)\\(c,m) = 1\end{aligned}\right\}\Rightarrow a \equiv b(\mod m)}\\{(4):\left.\begin{aligned} a &\equiv& b(\mod m_1)\\a &\equiv& b(\mod m_2)\\ &\vdots& \\a &\equiv& b(\mod m_n)\\(&n \ge 2)\end{aligned}\right\}\Rightarrow a\equiv b(\mod [m_1,m_2,\cdots,m_n])}" type="image/svg+xml" />

将n消掉，得：

结论五：当n和m互质时，
<embed src="http://latex.codecogs.com/svg.latex?{n^{\varphi(m)}\equiv 1(\mod m)}" type="image/svg+xml" />，这就是费马小定理的广义定义，也就是[欧拉定理](https://zh.wikipedia.org/wiki/欧拉定理_(数论))（也称费马-欧拉定理或欧拉函数定理）。

好了，终于把这些理论说完了，下面接着把最后一道题目解完吧。

题目：你在心里想好一个3位数，然后将这个数乘以91，最后把乘积的末尾三个数字发给我，让我猜猜你心里想的那个3位数是什么？

参考答案：

当时只有一位小伙伴参与了这个游戏，他发给我的三位数字是250，我的回答是750。这里面的玄机是什么呢？

先来看个例子：(13×27×45) mod 17 = ?，我们可以求13×27×45=15795，然后用15795÷17=929…2，得到结果是2；你还可以这么计算：

[(13×27 mod 17)×45] mod 17分解成下面的步骤：

13×27 mod 17 = 11，

11×45 mod 17 = 2，

答案也是2，这说明取模运算不论是在最后一次性求，还是在求解过程中就开始进行取模，都不会影响最后的结果。这个游戏中发送方进行了一次取模，末尾三个数字，其实就是对1000取模。如果我能求出一个数y=m×n，使得下面这个式子成立：<embed src="http://latex.codecogs.com/svg.latex?{a\bullet y\equiv q (\mod 1000)}" type="image/svg+xml" />，然后将m公开给所有人，n只有你自己知道，这样不论别人发什么给你，你都可以根据这个式子求出这个a，根据式子可得：ay=1000k + a，a和k是整数，因为要让等式与a无关，我们令k=k’a，当a=0，很容易猜出数字是0，当a不等于0，等式变形为y=1000k’+1。恰好1001=91×11，y就取值为1001，那么m=91,n=11。让我们来还原250的原数吧，250×11=2750，2750 mod 1000 = 750。验证一下对不对，750×91 = 68250，68250 mod 1000 = 250，完全正确。Ok，到这所有这个游戏也解决了，有兴趣的小伙伴可以跟别人玩一玩哦。

进入本系列的最后一个主题：RSA加密算法

先来梳理一下猜数游戏，通过一种算法得到这么两组数据，一组是(N,E)，对外公开，我们称它为公钥，比如游戏中(1000,91)；另一组是(N,D)，自己保存，不能让其他人知道，我们称它为私钥，比如游戏中的(1000,11)。根据某种算法用(N,E)对数据进行加密，然后通过某种算法用(N,D)对数据进行解密，最后得到原始数据，从而完成安全的通信，上面提到的私钥不能公开。这就非对称加密算法的基本思想。那有小伙伴就会问了，要这么麻烦干嘛，直接用一个密钥对数据进行加密，然后秘密的告诉要解密的小伙伴这个密钥，不就可以完成数据的安全通信吗？当然可以，生活中很多这种加密方式，加密压缩包就是一个例子。这种是对称加密算法的思路，不过这里面有一个问题，如何安全的把密钥告诉其他小伙伴呢？你可能说这个很简单，当面告诉他，或者发短信打电话告诉他。好吧，现实生活中这种方法不失为一种解决方案，但是在互联网中通信的可不是人，而是计算机或者更精确一点说应该是进程，这就成问题了。

下面对非对称加密方法原理进行详细的阐述一下：

在互联网中，所有的数据都是用二进制数表示，我们都可以将它们用整数表示，比如说：在计算机中字符’A’，它的二进制表示就是：01000001，用整数表示就是65，通过前面对数论知识的介绍，我们知道：任意整数 x ，随着 i（<embed src="http://latex.codecogs.com/svg.latex?{i\in n^{0}}" type="image/svg+xml" />）的增加，x 的 i 次方除以 N 的余数会呈现出以欧拉函数<embed src="http://latex.codecogs.com/svg.latex?{\varphi(N)}" type="image/svg+xml" />为长度的周期性。也就是说如果我们把我们要加密的数据x，也称为明文,对x进行e（<embed src="http://latex.codecogs.com/svg.latex?{0<e<\varphi(N)}" type="image/svg+xml" />）次幂得<embed src="http://latex.codecogs.com/svg.latex?{x^{e}}" type="image/svg+xml" />，用<embed src="http://latex.codecogs.com/svg.latex?{x^{e}}" type="image/svg+xml" />对N求余，得到密文y，这就是整个加密过程。解密过程是这样的，将得到的密文y进行<embed src="http://latex.codecogs.com/svg.latex?{(k\varphi(N)+1)\div e}" type="image/svg+xml" />（k为整数，当然这个结果一定要为整数）次幂得<embed src="http://latex.codecogs.com/svg.latex?{y^{k\varphi(N)+1}}" type="image/svg+xml" />，再将<embed src="http://latex.codecogs.com/svg.latex?{y^{k\varphi(N)+1}}" type="image/svg+xml" />对N求余，由于对x总共进行了<embed src="http://latex.codecogs.com/svg.latex?{k\varphi(N)+1}" type="image/svg+xml" />次幂（虽然中途对N求过模，但是不会影响最后求模的结果，虽然本文没有证明，有兴趣的小伙伴可以自行证明），由于x的i次方对N取余的余数的周期有<embed src="http://latex.codecogs.com/svg.latex?{\varphi(N)}" type="image/svg+xml" />，即：<embed src="http://latex.codecogs.com/svg.latex?{x\equiv x^{\varphi(N)+1}\equiv x^{k\varphi(N)+1}(\mod N)}" type="image/svg+xml" />，当N>x，这可以看出x mod N = x，<embed src="http://latex.codecogs.com/svg.latex?{x^{k\varphi(N)+1}\mod N = x}" type="image/svg+xml" />，从而得出了明文x。

现在问题在于这个e该怎么取值，才能使得<embed src="http://latex.codecogs.com/svg.latex?{(k\varphi(N)+1)\div e}" type="image/svg+xml" />是整数呢？在RSA加密算法中，令N=p×q，并且p与q是非常大的质数，且p不等于q。明显，p与q互质，根据欧拉函数得出：<embed src="http://latex.codecogs.com/svg.latex?{\varphi(N)=(p-1)(q-1)}" type="image/svg+xml" />。假设有一个整数d，满足<embed src="http://latex.codecogs.com/svg.latex?{d=(k\varphi(N)+1)\div e}" type="image/svg+xml" />，即：<embed src="http://latex.codecogs.com/svg.latex?{ed=k\varphi(N)+1}" type="image/svg+xml" />，亦即：<embed src="http://latex.codecogs.com/svg.latex?{ed\equiv 1(\mod \varphi(N))}" type="image/svg+xml" />，要使得这个式子d有解，根据之前的分水问题的结论可以知道，只有e和<embed src="http://latex.codecogs.com/svg.latex?{\varphi(N)}" type="image/svg+xml" />互质时，d才有解。所以，我们可以随机选择一个整数e，使得e满足<embed src="http://latex.codecogs.com/svg.latex?{1<e<\varphi(N)}" type="image/svg+xml" />且e与<embed src="http://latex.codecogs.com/svg.latex?{\varphi(N)}" type="image/svg+xml" />互质。再根据扩展辗转相除发求出d，这样我们就生成出了公钥(N，e)和密钥(N，d)。

举个例子吧，假如迪奥斯A和白富美B在热恋中，通信过程中各种甜言蜜语，有一天，A室友趁A不在的时候用A的QQ各种调戏B，搞的A跪了好几天主板，于是A和B商量，以后每次聊天的时候都要进行一次身份验证，确认身份后就可以放心地各种扯。那怎么验证身份呢，有人就说了，说口令：“天王盖地虎”，“宝塔镇河妖”，……高贵的白富美B嫌这太土匪了，于是A决定使用RSA的思想做了一个小程序发给B，并商定，以后A发第一条消息的时候，会附带这条消息一个签名，B只要把签名拷到程序中解出来跟消息内容一致就说明是A在跟B聊天。现在我们来看一看A是怎么做的呢，A先想两个质数p=17和q=19，N=17×19=323，<embed src="http://latex.codecogs.com/svg.latex?{\varphi(N)=16×18=288}" type="image/svg+xml" />，去e=5，5d mod 288 = 1，根据扩展辗转相除法求得d=173。公钥是（323，173），密钥是（323，5），公钥和密钥是可以交换的，为了演示把（323，173）当作公钥。比如对2进行加密，<embed src="http://latex.codecogs.com/svg.latex?{2^{173}\mod 323=15}" type="image/svg+xml" />，这个时候A发给B的第一条信息是2，15。当B收到这条消息时，她只要将15输入到小程序里面，输出的结果如果是2那么就说明这是就是没心没肺的那位，如果不是，B就可以启动反调戏程序。整个故事就这般完结了，可能有小伙伴就怀疑了，这难道不能破解么，我们来看一下怎么破解哈。因为公钥（323，173），你要设法去得到密钥第一步就是要将323进行分解，目前对一个整数分解成质因数的乘积只能通过简单粗暴的方法，就是一个一个去式，当然了，这个例子只是一个例子而已，323很快就能试出来，但是当这个整数很大的时候，这种简单粗暴的方法就歇菜了。正是因为 RSA 算法用到了大数分解难题，才保证了它的安全性。

2009年12月12日，编号为RSA-768（768 bits, 232 digits）数也被成功分解。这一事件威胁了现通行的1024-bit密钥的安全性，普遍认为用户应尽快升级到2048-bit或以上。

RSA-768表示如下：

1230186684530117755130494958384962720772853569595334792197322452151726400507263657518745202199786469389956474942774063845925192557326303453731548268507917026122142913461670429214311602221240479274737794080665351419597459856902143413
= 33478071698956898786044169848212690817704794983713768568912431388982883793878002287614711652531743087737814467999489
×
36746043666799590428244633799627952632279158164343087642676032283815739666511279233373417143396810270092798736308917



参考资料：
1. [跨越千年的RSA算法](http://www.matrix67.com/blog/archives/5100)
2. [RSA算法原理](http://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html)