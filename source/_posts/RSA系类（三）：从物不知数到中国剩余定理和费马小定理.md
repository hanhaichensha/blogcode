title: RSA系类（三）：从物不知数到中国剩余定理和费马小定理
tags:
  - RSA算法
  - 数学
  - 中国剩余定理
  - 费马小定理
categories:
  - 算法
date: 2015-02-03 23:51:00
---


先对昨天的错误进行修正：“最后，我们求解一下3×n - 5×m=4这个不定方程： 3×2 + 5×(-1)=1两边同时乘以4得：3×8 + 5×(-4)=4，从而得出：n=8，m=-4”，这句话中的m=-4应该改成m=4。

下面进入今天的主题： 

#### 3、今有物不知其数，三三数之剩二；五五数之剩三；七七数之剩二。问物几何?
{% blockquote 维基百科 http://baike.baidu.com/link?url=nUHiJ81_AIP_fx3ebRpG4BJBAkPfOdEkaqfT6g3_A12-soPBRF6fzKSQQRZuvNMDEe7lhfworl2v_TBb9g5Kba 物不知数%}
中国古代著名算题。原载《孙子算经》卷下第二十六题：“今有物不知其数，三三数之剩二；五五数之剩三；七七数之剩二。问物几何?”当时虽已有了答案23，但它的系统解法是秦九韶在《数书九章·大衍求一术》中给出的。大衍求一术（也称作“中国剩余定理”）是中国古算中最有独创性的成就之一，属现代数论中的一次同余式组问题。
{% endblockquote %}
<!--more-->

今天讨论一下中国剩余定理，先把这个‘物不知数’这个问题解决。

参考答案：

先回顾一下分水问题，我们首先对一种简单的情况进行数学抽象，得出要解决分水问题，就要先解出3×n - 5×m=1这个二元不定式，再根据扩展欧几里得算法求得m、n，得出结果，最后总结出：在区间[1,max{a,b}-1]上的a和b的最大公约数的整数倍是能够精确取出来的，这其实就是裴蜀定理。

现在我们把这个数学抽象变化一下，变成这个样子：<embed src="http://latex.codecogs.com/svg.latex?{3x\mod5=1} " type="image/svg+xml" />，抑或者是：<embed src="http://latex.codecogs.com/svg.latex?{3x\equiv1(\mod 5)} " type="image/svg+xml" />，这两个等式都是表示3x除以5的余数为1（如有小伙伴还不明白等式是什么含义请参考[同余](https://zh.wikipedia.org/wiki/同餘)）。由于这两个式子和3×n - 5×m=1都是对分水问题的数学抽象，因此，都可以使用扩展欧几里得算法求解x，请记住这种方法，待会用的着。

先给出同余的概念：当两个整数除以同一个正整数，若得相同余数，则两整数[同余](https://zh.wikipedia.org/wiki/同餘)。

下面几个同余的性质接下来可能用得着：

1）传递性
<embed src="http://latex.codecogs.com/svg.latex?{\left.\begin{aligned}a&\equiv&b(\mod m)\\b&\equiv&c(\mod m)\end{aligned}\right\}\Rightarrow a\equiv c(\mod m)}" type="image/svg+xml" />
2）保持基本运算
<embed src="http://latex.codecogs.com/svg.latex?{\left.\begin{aligned}a&\equiv&b(\mod m)\\c&\equiv&d(\mod m)\end{aligned}\right\}\Rightarrow \left\{\begin{aligned}a\pm c&\equiv&b\pm d(\mod m)\\ac&\equiv&bd(\mod m)\end{aligned}\right.}" type="image/svg+xml" />
这性质更可进一步引申成为这样：
<embed src="http://latex.codecogs.com/svg.latex?{a\equiv b(\mod m)\Rightarrow \left\{\begin{aligned}an&\equiv&bn(\mod m),\forall n\in\mathbb{Z}\\a^{n}&\equiv&b^{n}(\mod m),\forall n \in \mathbb{N}^{0}\end{aligned}\right.}" type="image/svg+xml" />
 
好了，开始解题：

以下解题过程中都是针对整数而言，没有特殊说明都是指整数。

设这个整数为x，

根据题意可得：

<embed src="http://latex.codecogs.com/svg.latex?{(S):\left\{\begin{aligned}x&\equiv&2 (\mod3)\\x&\equiv&3(\mod5)\\x&\equiv&2(\mod7)\end{aligned}\right.}" type="image/svg+xml" />

我们来思考这么一种情况：

如果一个整数X1满足，X1是5和7的倍数，除以3的余数是2，那么就能推出下面这组同余式：

<embed src="http://latex.codecogs.com/svg.latex?{\left\{\begin{aligned}x_1&\equiv&2 (\mod3)\\x_1&\equiv&0(\mod5)\\x_1&\equiv&0(\mod7)\end{aligned}\right.}" type="image/svg+xml" />

同理，整数X2满足，X2是3和7的倍数，除以5的余数是3，整数X3满足，X3是3和5的倍数，除以7的余数是2：

<embed src="http://latex.codecogs.com/svg.latex?{\left\{\begin{aligned}x_2&\equiv&0 (\mod3)\\x_2&\equiv&3(\mod5)\\x_2&\equiv&0(\mod7)\end{aligned}\right.}" type="image/svg+xml" />，<embed src="http://latex.codecogs.com/svg.latex?{\left\{\begin{aligned}x_3&\equiv&0 (\mod3)\\x_3&\equiv&0(\mod5)\\x_3&\equiv&2(\mod7)\end{aligned}\right.}" type="image/svg+xml" />
根据
<embed src="http://latex.codecogs.com/svg.latex?{\left.\begin{aligned}a&\equiv&b(\mod m)\\c&\equiv&d(\mod m)\end{aligned}\right\}\Rightarrow a\pm c&\equiv&b\pm d(\mod m)}" type="image/svg+xml" />
得：
<embed src="http://latex.codecogs.com/svg.latex?{\left.\begin{aligned}x_1&\equiv&2(\mod 3)\\x_2&\equiv&0(\mod 3)\end{aligned}\right\}\Rightarrow x_1+ x_2&\equiv&2+0(\mod 3)}" type="image/svg+xml" />，<embed src="http://latex.codecogs.com/svg.latex?{\left.\begin{aligned}x_1+x_2&\equiv&2(\mod 3)\\x_3&\equiv&0(\mod 3)\end{aligned}\right\}\Rightarrow x_1+ x_2+x_3&\equiv&2+0(\mod 3)}" type="image/svg+xml" />
所以：
<embed src="http://latex.codecogs.com/svg.latex?{ x_1+ x_2+x_3&\equiv&2(\mod 3)}" type="image/svg+xml" />；
同理可得：
<embed src="http://latex.codecogs.com/svg.latex?{ x_1+ x_2+x_3&\equiv&3(\mod 5)}" type="image/svg+xml" />，<embed src="http://latex.codecogs.com/svg.latex?{ x_1+ x_2+x_3&\equiv&2(\mod 7)}" type="image/svg+xml" />；

因此，只要我们求得X1+X2+X3就是答案。现在我们来看一下X1怎么求解吧：

根据
<embed src="http://latex.codecogs.com/svg.latex?{\left\{\begin{aligned}x_1&\equiv&2 (\mod3)\\x_1&\equiv&0(\mod5)\\x_1&\equiv&0(\mod7)\end{aligned}\right.}" type="image/svg+xml" />等价于<embed src="http://latex.codecogs.com/svg.latex?{5\times 7\times x_1^{'}&\equiv&2(\mod 3)}" type="image/svg+xml" />，因此只要求出x1'即可求出答案，这个时候就得用上扩展欧几里得算法求出x1'，哈哈，整个人都神清气爽了有木有。我们再把上面等式翻译成分水问题，有35升和3升无刻度的两个容器，现在只能用35升的容器取水，3升的容器倒水，请精确取出2升水。

我们还是根据扩展欧几里得算法得出：

3×12 + 35×(-1) =1，这个结果好像不对头，它是用3升的容器取水，35升容器倒水的结果，那该怎么办呢？很简单等式两边同时乘以-1，就变成了35升的容器取水，3升的容器倒水，第12次倒水后得-1，这明显不可能，少倒一次水，剩下的就正好是2升水，所以x1'=1。

同理求出<embed src="http://latex.codecogs.com/svg.latex?{ x_2^{'}=3,x_3^{'}=2}" type="image/svg+xml" />；

从而得出<embed src="http://latex.codecogs.com/svg.latex?{ x_1=35,x_2=63,x_3=30}" type="image/svg+xml" />，

最后得出x=X1+X2+X3=128，

这个地方碰巧，很容易能取出2升水，我们还是按照我们先取出1升，让后再根据倍数关系，求得2升水吧，这样的话更具有规律性。

<embed src="http://latex.codecogs.com/svg.latex?{\left.\begin{aligned}35\times 1+3\times (-12)&=&-1\\35\times 1+3\times(-11)&=&2\end{aligned}\right\}\Rightarrow 35\times 2+3\times (-23)=1}" type="image/svg+xml" />，从而x1'=2×2=4，同理得x2'=3，x3'=2，此时我们称x1'、x2'、x3'为模逆元，由于它们形如：<embed src="http://latex.codecogs.com/svg.latex?{x_1^{'}\times M&\equiv&1(\mod m)}" type="image/svg+xml" />，所以也称为数论倒数；

从而得出x1=140，x2=63，x3=30，

最后得出x=X1+X2+X3=233，

聪明的小伙伴立刻明白答案不止一个，23也是对的，而且还有无数多个解，下面进一步说明一下：

由于3,5,7这三个数是两两互质，所以它们的最小公倍数是3×5×7=105,105显然能同时整除3,5,7。根据下面这个性质：
<embed src="http://latex.codecogs.com/svg.latex?{\left.\begin{aligned}a&\equiv&b(\mod m)\\c&\equiv&d(\mod m)\end{aligned}\right\}\Rightarrowa\pm c&\equiv&b\pm d(\mod m)}" type="image/svg+xml" />
x+k×105显然还是满足
<embed src="http://latex.codecogs.com/svg.latex?{\left\{\begin{aligned}x+k\times 105&\equiv&2(\mod 3)\\x+k\times 105&\equiv&3(\mod 5)\\x+k\times 105&\equiv&2(\mod 7)\end{aligned}\right.}" type="image/svg+xml" />,
因此，这个问题的通解是：<embed src="http://latex.codecogs.com/svg.latex?{23+k\times 105,k\in\mathbb{Z}}" type="image/svg+xml" />。

Ok，解题完毕，物不知数就是中国剩余定理的一个实例。现在来看孙子定理也就是中国剩余定理：给出 i 个两两互质的整数，记为<embed src="http://latex.codecogs.com/svg.latex?{\display m_1,m_2,m_3,\cdots,m_i}" type="image/svg+xml" />，它们的乘积为 P ；假设有一个未知数 M ，如果我们已知 M 分别除以这 m 个数所得的余数，记为<embed src="http://latex.codecogs.com/svg.latex?{\display r_1,r_2,r_3,\cdots,r_i}" type="image/svg+xml" />那么在 0 到 P–1 的范围内，我们可以唯一地确定这个 M 。现代数学语言的描述，我就不贴了，有兴趣的同学就自己看wiki吧。

我们从定义里面可以看出中国剩余定理有以下两点特性：

1.当的整数时<embed src="http://latex.codecogs.com/svg.latex?{M\in[0,P-1]}" type="image/svg+xml" />每一组余数（记为：<embed src="http://latex.codecogs.com/svg.latex?{\display r_1,r_2,r_3,\cdots,r_i}" type="image/svg+xml" />）都有唯一的一个M与之对应，而且每一个M也只有一组余数与之对应，即M与<embed src="http://latex.codecogs.com/svg.latex?{\display r_1,r_2,r_3,\cdots,r_i}" type="image/svg+xml" />是一一对应关系，由于M的取值恰好是任意整数对P求余的余数，所以结论也可以表述为任意整数对P的余数与<embed src="http://latex.codecogs.com/svg.latex?{\display r_1,r_2,r_3,\cdots,r_i}" type="image/svg+xml" />是一一对应关系；

2.在<embed src="http://latex.codecogs.com/svg.latex?{m\in\mathbb{Z}}" type="image/svg+xml" />，如果余数数组看作m的一个函数，那么函数呈现周期性，且m的最小正周期是P。

 

下面举个例：

2个互质的整数3和10，它们的乘积是30，那么在[0,29]区间内的数，分别处以3和10的余数如下表所示：

| i        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| :-------:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| i mod 3  | 0 | 1 | 2 | 0 | 1 | 2 | 0 | 1 | 2 | 0 |
| i mod 10 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| i        | 10| 11| 12| 13| 14| 15| 16| 17| 18| 19|
| i mod 3  | 1 | 2 | 0 | 1 | 2 | 0 | 1 | 2 | 0 | 1 |
| i mod 10 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| i        | 20| 21| 22| 23| 24| 25| 26| 27| 28| 29|
| i mod 3  | 2 | 0 | 1 | 2 | 0 | 1 | 2 | 0 | 1 | 2 |
| i mod 10 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |


由除以3的余数与除以10的余数组成的余数对没有出现重复现象，而且，整数M对30取模它的余数就是上表中i的取值，这就表明若果已知两个互质的整数3和10，可知它们的最小公倍数，记为gcd(3,10)，易得gcd(3,10)=3×10=30，此时，余数数对(x mod 3 , x mod 10)与x mod 30可以建立一个一一对应的关系。

再来看看上面用蓝色标出的余数对(也就是能除以3余数为0的那些余数数对），刚好是10对，而且除以10的余数恰好沾满了0到9这十个数字（这同是解释了九九乘法表中，乘以3所在和列的那九个数的个位数正好沾满了1到9这九个数字），这是为什么呢，还记得分水问题中，哪些能准确取出来，哪些不能吗？小伙伴们，是不是同样的道理呀。

 

今天还要完成一道题目：

 

在银行办理业务的时候，通常我们是要排队的，然后你就要去叫号机取个号，假设号码是由AB这两个个字符组成的3位号码，在每个业务窗口的上方都会有一个LED的跑马灯，显示正在处理哪个号客户的业务。现在，假设在这个LED灯只显示3位的号码，而且灯的长度刚刚好只够显示3个字符。我们都知道跑马灯是循环滚动显示：比如说：刚开始的时候显示的ABB，过一小会儿，然后向左滚动一个字符变成了：BBA，如此滚动，滚动三次后又回到了ABB。假设某个字符串循环移位后才能得到另一个字符串，我们就认为这两个字符串属于同一组字符串。比如刚才那组就是通知字符串（或称同组号码），第一个字符串向左移一位就能第二字符串，问这样的同组字符串一共有多少组，如果号码是由3个、4个……n个字符组成时，一共有多少组呢？（这只是一个题目，实际生活中是不可能的，不然滚动时都不知道是在处理同组号码的哪一个号码）

参考答案：

先看由两个字母生成3位长的号码这种情况，一共可以生成<embed src="http://latex.codecogs.com/svg.latex?{\display 2^{3}}" type="image/svg+xml" />个字符串，它们分别为：AAA,AAB,ABA,ABB,BAA,BAB,BBA,BBB，AAA和BBB其他字符串是无法通过循环移位得到的，排除掉，AAB可以由ABA和BAA移位得到，ABB可以由BAB和BBA移位得到，从这可以看出三位的号码，不管三位上的字符是什么，同组的字符串都只有3个，因为三位的字符只向同一方向循环移动3次又会回到原来的字符，每移动一次都是同组中的同一个字符串，因此每一组字符串中都只有3个字符串，所以答案是<embed src="http://latex.codecogs.com/svg.latex?{\display (2^{3}-2)\div 3=2}" type="image/svg+xml" />，与刚才移动的结论相吻合，当然了这里我故意忽略了一种因素没有考虑，待会再说，接着用这种方式分析可以得出用n个字母成3位长的号码这种情况为<embed src="http://latex.codecogs.com/svg.latex?{\display (n^{3}-n)\div 3}" type="image/svg+xml" />；3和4的情况可以用这个通式求得。

现在我们再思考一种情况，如果号码的长度是4，而且跑马灯也刚刚好能显示4个字符，又会怎么样呢？用上面的通式，是不是<embed src="http://latex.codecogs.com/svg.latex?{\display (n^{3}-n)\div 4}" type="image/svg+xml" />呢？答案是否定的，应为长度为4的号码，它可能会出现ABAB这种情况，而与这个号码同组的号码只有BABA，没有想上面分析的那样有4个号码，所以除以4这显然是错的，那在什么情况下上面这个通式是正确的呢？我们仔细想一想，如果号码的连续x（x>1，且x<n，n是号码的长度）个字符重复y次之后就是整个号码字符串，这种情况就不满足这个通式，否则，就满足通式。我们再来分析一下这句话“如果号码的连续x（x>1且x<m，m是号码的长度）个字符重复y次之后就是整个号码字符串”，翻译成数学语言就是xy=m，(x>1且x<m)，要不满足这个条件，也就是说m除了能倍1和m整除外，不能倍任何整数整除，也就是说当m为质数的时候才满足通式，由此可得：

<embed src="http://latex.codecogs.com/svg.latex?{\display (n^{m}-n)\div m}" type="image/svg+xml" />是由n个字符组成的m位号码的同组号码的组数，因为是组数所以一定是一个整数值，从而推出：当m为质数时：<embed src="http://latex.codecogs.com/svg.latex?{\display (n^{m}-n)&\equiv&0(\mod m)}" type="image/svg+xml" />，根据同余的性质，将式子等价变换一下得：

当m是质数时：<embed src="http://latex.codecogs.com/svg.latex?{\display (n^{m}&\equiv&n(\mod m)}" type="image/svg+xml" />，这就是费马小定理。根据性质：
<embed src="http://latex.codecogs.com/svg.latex?{\left.\begin{aligned}a&\equiv&b(\mod m)\\c&\equiv&d(\mod m)\end{aligned}\right\}\Rightarrow a\bullet c&\equiv&b\bullet d(\mod m)}" type="image/svg+xml" />，
由于：
<embed src="http://latex.codecogs.com/svg.latex?{\left.\begin{aligned}n^{m}&\equiv&n(\mod m)\\n&\equiv&n(\mod m)\end{aligned}\right\}\Rightarrow n^{m}\bullet n&\equiv&n\bullet n(\mod m)}" type="image/svg+xml" />
，得：
<embed src="http://latex.codecogs.com/svg.latex?{n^{m+1}&\equiv&n^{2}(\mod m)}" type="image/svg+xml" />
，同理可得：
<embed src="http://latex.codecogs.com/svg.latex?{n^{m+2}&\equiv&n^{3}(\mod m),\cdots,{n^{2m-2}&\equiv&n^{m-1}(\mod m),{n^{m-1}&\equiv&n^{m}&\equiv&n(\mod m)}" type="image/svg+xml" />
也就是说，如果 m 是一个质数的话，那么对于任意一个整数 n ，随着 i (<embed src="http://latex.codecogs.com/svg.latex?{\display i\in \mathbb{N}^0}" type="image/svg+xml" />)的增加， n 的 i 次方除以 m 的余数将会呈现出长度为 m – 1 的周期性，这就是费马小定理另一种表述。

现在还有一个问题，如果m不是质数呢？

参考资料：
1. [跨越千年的RSA算法](http://www.matrix67.com/blog/archives/5100)
2. [RSA算法原理](http://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html)