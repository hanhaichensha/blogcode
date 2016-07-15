title: 读书笔记：Ruby篇（一）
tags:
  - Ruby
categories:
  - Ruby
date: 2015-07-19 16:05:55
---


1．Ruby简史
        
Ruby是由日本的松本行弘大约在1993年发明，在2006年前后随着Rails框架崭露头而一鸣惊人。

Ruby的发明者Matz为让Ruby成为一门充满乐趣的编程语言，为此，他为Ruby加了一勺糖，一勺语法糖，这勺糖打破了一些语言常规，不仅为程序员提供更加好的体验，而且让代码更加容易理解。此外，Ruby并没有过多的担心编程语言的执行效率，而是把精力放在了提高程序员的编程效率上，于是Matz在简单性和安全性之间、编码效率和程序性能之间做了让步和折中。

松本行弘访谈录

问题一：你为什么要开发Ruby？
总结Matz的回答：始于对编程语言的兴趣，受到Perl这门可以提高苦逼程序员生产力的语言的启发，最后开发出了Ruby，并受到了世界各地程序员的的喜爱。

问题二：你喜欢它哪一点呢？
Matz回答：喜欢它的寓教于乐的方式。在技术上，最喜欢的是“代码块（block）”，它是一种易于控制的高阶函数，也为领域特定语言及其他特性的实现提供了极大的灵活性。

问题三：如果能让时光倒流，你想改变哪些特性？
Matz回答：我想去掉线程，加入actor（参与者）或一些更高级的并发特性。
<!--more-->
Ruby为何如此迷人，让我们来看看它到底是一门什么样的语言。Ruby是一门解释型、面向对象、动态类型的脚本语言。

解释型：意味着Ruby代码由解释器而非编译器执行。
面向对象：意味着Ruby支持封装、类继承、多态等特性。
动态类型：意味着类型在运行时而非编译时绑定，但这并不意味着它就是弱类型语言，相反它是强类型语言。

从解释型和动态类型可以看出Ruby采取的策略是在灵活性和运行时安全之间寻找平衡点。

2．第一天：找个保姆

作者把Ruby比作《欢乐满人间》中的仙女保姆Mary Poppins。要想了解Ruby的魅力，就要先了解这门语言能做什么，就像要想了解Mary Poppins的魔法，就得先了解保姆的工作一样，所以让我先找一个“保姆”。

2．1 快速起步

Ruby的安装，请参考官网https://www.ruby-lang.org/zh_cn/downloads/，此处从略。

2．2 从命令行执行Ruby

我的环境是windows7，Ruby2.2.2。在命令行中输入irb进入Rubyshell。

1）从hello，world说开去
```ruby
irb(main):001:0> puts "hello,world"
hello,world
=> nil
```
说明：
irb(main):001:0>：是输入命令提示符；
puts "hello,world"：Ruby代码；
hello,world：puts函数输出；
=> nil：函数puts的返回值。

从这里可以看出，只有一行Ruby代码，并没有看其他语言中一直提到的入口函数Main，这就是为什么说Ruby是一门解释型语言，它是通过解释器，将Ruby代码逐行读入，然后解释执行。说它是解释型语言，更重要的依据是它没将代码编译成字节码再执行。

2）变量
```ruby
irb(main):002:0> language = "Ruby"
=> "Ruby"
irb(main):003:0> puts "hello, #{language}"
hello, Ruby
=> nil
irb(main):004:0> language = “Ruby”
=> "Ruby"
irb(main):005:0> puts 'hello, #{language}'
hello, #{language}
=> nil
```
请注意比较前五行和后五行！
说明：
1> Ruby是解释执行的。确切地说， Ruby几乎总是解释执行的，但也有开发者正着手开发虚拟机，想把Ruby代码编译成字节码再执行；
2> 代码里没有声明任何变量，如：string language；
3> 即使没让Ruby返回任何值，这几行代码也都具有各自的返回值。特别说明：每条Ruby代码都会返回某个值。
4> 字符串的两种形式，一种是用单引号包含的字符串，这种字符串几乎是将字符串不加改动地直接解释，当然也有改动的例外：’\’’（反斜线接单引号），解释为：’（单引号）；’\\’（两个反斜线），解释为：\（一个反斜线）。另一种使用双引号包含的字符串，这种字符串支持更多的转义序列，最常见的是\n。此外，#{expr}序列把任何Ruby代码的值放进字符串，如上面puts “hello, #{language}”，当然还可更复杂一些，如：
```ruby
puts "#{
def get_name(who)
who
end
get_name('xxx')
},good night”
```
当然字符的构建还有其他三种方法，%q，%Q和here document，如：
%q<aaa>：表示’aaa’；
%Q(bbb)，表示”bbb”；
上面的<>可以换成{}、()、//、[]，
here document：
```ruby
string=<<END_OF_STRING
ccc
END_OF_STRING
string=<<-STRING
ccc
    STRING
```
第二行的最后一个换行符（\n）也会包含在内
第三行注意一定是在行的开头，不能有任何空格
第四行注意这个地方有个负号
第五行这一行的最后一个换行符（\n）也会包含在内
第六行这里允许有空格

2．3 Ruby的编程模型

Ruby是一门纯面向对象语言。真的是一切皆对象，不像一些你现在正在使用的某些面向对象语言，他们大都带有过程式语言要素。先来看一些基本对象：
```ruby
irb(main):008:0> 5
=> 5
irb(main):009:0> 5.class
=> Fixnum
irb(main):015:0> 5.0.class
=> Float
irb(main):013:0> 5.methods
=> [:to_s, :inspect, :-@, :+, :-, :*, :/, :div, :%,...]
irb(main):007:0> -5.abs
=> 5
irb(main):012:0> 5.equal?4
=> false
irb(main):005:0> "abc".class
=> String
irb(main):006:0> "abc".length
=> 3
irb(main):014:0> true.class
=> TrueClass
```
说明：
1．数字，字符串，true和false都是对象，真正的一切皆对象，就连单独数字都不例外；
2．对象方法的调用也是通过“对象.方法”的方式来调用，只不过用于限定方法参数列表界限的括号可以省略。
3．Ruby数组是用[]来表示的，函数methods的返回值就是一个数组。
4．还有一个很特别的方法——“equal?”这是什么鬼？原来在Ruby中方法名字中可以允许有?、!和=，这三个特殊字符，表示查询的方法名通常以“?”结尾，而且它们通常是返回true或者false；“危险的”或者会修改接收者对象的方法，通常以“!”结尾，例如：String提供的downcase和downcase!，第一个不会修改调用该方法的字符串对象的值，只是返回一个小写的字符串，而第二个会改变；可以被赋值的方法通常以“=”结尾，详情以后再说。

2．4 判断

要说判断首先要了解真值，表达式什么时候是真，什么时候是假？不多说上代码：
```ruby
irb(main):001:0> x = 4
=> 4
irb(main):002:0> x < 5
=> true
irb(main):003:0> x <= 4
=> true
irb(main):004:0> x > 4
=> false
```
这些和其它语言是一样的，接着看：
```ruby
irb(main):001:0> x = 4
=> 4
irb(main):002:0> if x == 4
irb(main):003:1> puts 'if x equal 4'
irb(main):004:1> else
irb(main):005:1* puts 'if x not equal 4'
irb(main):006:1> end
if x equal 4
=> nil
irb(main):007:0> unless x == 4
irb(main):008:1> puts 'unless x equal 4'
irb(main):009:1> else
irb(main):010:1* puts 'unless x not equal 4'
irb(main):011:1> end
unless x not equal 4
=> nil
```
说明：
1>判断表达式有：
```ruby
1）
if 条件 1 then
    处理 1
elsif 条件 2 then
    处理 2
elsif 条件 3 then
    处理 3
else
    处理 4
end
※ 可以省略 then
2）
unless 条件 then
    处理 1
else
    处理 2
end
※ 可以省略 then
unless等价于 if not
3）
case 比较对象
when 值 1 then
    处理 1
when 值 2 then
    处理 2
when 值 3 then
    处理 3
else
    处理 4
end
※ 可以省略 then
```
注意：这里说的是判断表达式，为什么说它是表达式，是因为它是有返回值的。

2>if和unless修饰符, 为了提高程序员的生产力，Matz还为if和unless提供了一种简便表达：
```ruby
irb(main):033:0> x = 4
=> 4
irb(main):034:0> puts 'This appears to be false.' unless x == 4
=> nil
irb(main):035:0> puts 'This appears to be true.' if x == 4
This appears to be true.
=> nil
```
说明：
1）格式:简单表达式 unless 条件
2）格式:简单表达式 if 条件

3>顺带说一下while和until循环表达式：
```ruby
while 条件
    处理
end
条件为真时进行循环
until 条件
    处理
end
条件为真时跳出循环。
它们也有修饰符，如 x = x + 1 while x < 10，x = x + 1 until x == 1。
```
再看看哪些值是真，哪些是假值？
```ruby
irb(main):001:0> puts 'true' if 1
true
=> nil
irb(main):002:0> puts 'true' if 'aa'
(irb):2: warning: string literal in condition
true
=> nil
irb(main):003:0> puts 'true' if 0
true
=> nil
irb(main):004:0> puts 'true' if true
true
=> nil
irb(main):005:0> puts 'true' if false
=> nil
irb(main):006:0> puts 'true' if nil
=> nil
```
说明：从上面可以看出来，除了nil和false之外，其他值都代表真，注意0也是true！，只有nil和false表示假。

最后，看一下逻辑运算符（&&、||、!、and、or、not、&和|）：&&与and是等价的只是优先级不一样，||和or是等价的只是优先级不一样，并且这些与和或运算符都是有短路效应的，！和not是等价的只是优先级不一样，&和|也是与和或运算，只是它们没有短路效应。

还有一点值得说一下：and，or，&&，||，&和|实际上是返回首个决定条件真伪的参数的值。

比如说表达式” val1 and val2”，如果val1是false或者nil，那么就能判断整个表达式为假，所以整个表达式就返回val1的值，如果val1是除false和nil之外的其他值，那么还不能判断整个表达式的真伪，接着求val2的值，这时整个表达式的真伪完全依赖于val2，所以整个表达式返回val2的值。

&和|还有一点要特别说明，由于它们的优先级过低，最好是用括号把两个操作数括起来，比如：(x == 4) | (p “lalala”)，否则很容出现错误提示。

2．5 鸭子类型

了解了语言模型，让我们来看看类型模型。

Ruby是动态类型语言，也就是说变量无需提前声明，直接就可以使用，这些变量都是在运行时进行类型检查和绑定。比如：前面的对象5，它并没有声明为Fixnum 5，而是直接使用。也就是说强类型语言，它会进行类型检查，在你使用错误类型时，你会得到一个错误。但是由于它是动态类型，所以进行类型检查是在运行时而非编译时。相对于在编译时进行类型检查和绑定的静态类型，Ruby获得的错误提前会少一些。这就是类型安全（在使用错误类型时，语言能在多大程度上给予保护）向简单性做出的让步和折中。这里有一个证明Ruby是运行进行类型检查的例子：
```ruby
irb(main):001:0> def add_them_up
irb(main):002:1> 4 + 'four'
irb(main):003:1> end
=> :add_them_up
irb(main):004:0> add_them_up
TypeError: String can't be coerced into Fixnum
from (irb):2:in `+'
from (irb):2:in `add_them_up'
from (irb):4
from d:/Ruby22/bin/irb:11:in `<main>'
```
说明：
函数定义中出现了错误，但是解释器并没有给出错误提示，直到调用函数时才给出错误提示。

虽然Ruby在安全性上做出了让步，但是Ruby的类型系统也有自己的优势，由于只有在运行时才进行类型检查，于是即使多个类不必继承自相同的父类，就能以相同的方式使用：
```ruby
irb(main):001:0> i = 0
=> 0
irb(main):002:0> a = ['100',100.0]
=> ["100", 100.0]
irb(main):003:0> while i < 2
irb(main):004:1> puts a[i].to_i
irb(main):005:1> i = i + 1
irb(main):006:1> end
100
100
=> nil
```
说明：
从上面的例子中可以看出，数组中包含了两个不同类型的元素，一个是String，另一个是Float，数组是相同数据类型的元素按一定顺序排列的集合，由于类型检查的宽松，在同一个数组中可以包含不同类型的元素，在转换成整数的时候，两个元素都支持to_i方法，这两个元素的外部表现完全一致，于是可以把它们看成是相同类型。这里就是鸭子类型：不在乎其内在类型可能是什么，只要他们有相同的处理方法，那么就可以看作是相同类型进行处理。也就是只要它像鸭子一样走路，像鸭子一样嘎嘎叫，那我们就可以认为它就是只鸭子，不管它是不是真的鸭子。鸭子类型其实就是在面向对象设计思想中的一个重要原则：对接口编码，不对实现编码。

2.6第一天我们学到了什么

Ruby是一门解释型、动态类型、强类型、纯面向对象的脚本语言。

2.7 第一天自习
1）字符串
```ruby
irb(main):001:0> "test".size
=> 4
irb(main):002:0> "test".include?"s"
=> true
irb(main):003:0> "test".index "s"
=> 2
irb(main):004:0> "test".upcase
=> "TEST"
irb(main):005:0> "this is a test".split(" ")
=> ["this", "is", "a", "test"]
irb(main):006:0> "this is a test".sub("this","This")
=> "This is a test"
irb(main):007:0> "this is a test".gsub("is","IS")
=> "thIS IS a test"
irb(main):008:0> "this is a test".gsub(/[aeiou]/,"1")
=> "th1s 1s 1 t1st"
```
2）Ruby区间（range）
```ruby
irb(main):001:0> (0..9)
=> 0..9
irb(main):002:0> (0..9).size
=> 10
irb(main):003:0> (0..9).include?(3)
=> true
irb(main):004:0> (0..9).inject{|e,sum| sum += e}
=> 45
```
3）打印字符串”Hello,world.”
```ruby
irb(main):005:0> puts "Hello, world."
Hello, world.
=> nil
```
4）在字符串”Hello,Ruby.”中，找出”Ruby.”所在下标
```ruby
irb(main):006:0> "Hello,Ruby.".index("Ruby")
=> 6
```
5）打印你的名字十遍
```ruby
irb(main):007:0> 10.times{ puts "your name" }
your name
your name
your name
your name
your name
your name
your name
your name
your name
your name
```
6）打印字符串”This is sentence number 1.”，其中的数字1会一直变化到10。
```ruby
irb(main):008:0> (1..10).each {|i| puts "This is sentence number #{i}"}
This is sentence number 1
This is sentence number 2
This is sentence number 3
This is sentence number 4
This is sentence number 5
This is sentence number 6
This is sentence number 7
This is sentence number 8
This is sentence number 9
This is sentence number 10
```
7）随机产生一个0~9之间的数，让玩家猜这个数是多少，并告玩家猜大了还是猜小了。
在一个文件guess.rb输入如下代码：
```ruby
puts "guess the num(0~9),enter q to exit"
num = rand(10).to_i
while getnum = gets.chomp
    break if getnum == "q"
    guess = getnum.to_i
    if guess == num
        puts "you get the right num!"
        break
    elsif guess > num
        puts "bigger!"
    else
        puts "smaller!"
    end
end
```
在命令行定位到guess.rb文件所在位置，然后输入ruby guess.rb。