title: 读书笔记：Ruby篇（二）
tags:
  - Ruby
categories:
  - Ruby
date: 2015-07-26 23:53:00
---


第一天对Ruby做了概述，第二天，你会亲身体验令Ruby大受欢迎的小魔法。你将学习对象、集合、类等基本构建单元的用法，还将学到代码块的基本要素。我在这里补充了Ruby中的一些基本知识。

预备知识：

Ruby使用一种命名惯例来区分名称的用途：名称的第一个字符显示这个名称如何被使用。局部变量、方法参数和方法名称都必须以小写字母或下划线开始。全局变量以美元符号（$）为前缀，而实例变量以“at”（@）符号开始。类变量以两个“at”（@@）符号开始。最后，类名称、模块名称和常量都必须以一个大写字母开始。之后的字符可以是字母、数字和下划线的任意组合（但跟在@符号候命的符号不能是数字）。但是按照惯例，包含多个单词的实例变量名称在词与词之间使用下划线连接，包含多个单词的类变量名称使用混合大小写（每个单词首字母大写）。方法名称可以以?、!和=字符结束。还有一点：从定义一元运算符有 +（正）、 -（负）、 ~（位反）、 !（非）， 它们分别以 +@、 -@、 ~@、 !@ 为方法名进行方法的定义，调用时直接使用+、-、~、@。

### 1．基本数据类型
{% asset_img  图一.png 图一 %}
<!--more-->
1.1 Numeric（数值）

数值类型包括：Integer（整数）、Float（浮点数）、Rational（有理数）和Complex（复数），其中Integer（整数）分为Fixnum（普通整数）和Bignum（大整数）。程序中用到的整数一般都是 Fixnum 类范围内的整数。 如果使用的整数超过了 Fixnum 的范围， Ruby 就会自动将其转换为 Bignum 类。 因此， 在写程序的时候， 我们几乎可以忽略上述整数类的区别。

Rational 对象用“Rational( 分子 , 分母 )”的形式定义：
```ruby
a = Rational(2, 5)
p a #=> (2/5)
```
Complex 对象用“Complex( 实数 , 虚数 )”的形式定义：
```ruby
c = Complex(1, 2)
p c #=> (1+2i)
```
Integer 对象与 Float 对象的运算结果为 Float 对象。 Integer 对象之间、 Float 对象之间的运算结果分别为 Integer 对象、 Float 对象。

将 Integer 对象转换为 Float 对象时， 可以使用 to_f 方法。 相反， 使用 to_i 方法则可以将 Float 对象转换为 Integer 对象（ Integer#to_i 方法和Float#to_f 方法返回与接收者一样的值） 。 另外， 也可以把字符串转换为数值，如：”123.45”.to_f。最后，还有一个新运算符**表示乘方。更多信息，请参考手册。

1.2 Symbols符号
符号是前面带有冒号的标识符，类似于:symbol的形式。符号与字符串之间的区别是：两个同值字符串在物理上是不同，但相同的符号却是同一物理对象。
```ruby
>> 'string'.object_id
=> 10617408
>> 'string'.object_id
=> 18259680
>> :string.object_id
=> 160340
>> :string.object_id
=> 160340
```
1．3 Ranges（区间）
除了用在条件表达式中expr..expr和expr…expr还能构成Range对象。两个点的形式是闭合区间，而三个点的形式是半开半闭的。
1.4String（字符串），从略，更多信息，请参考手册。
1.5 Arrays（数组）
1．5．1 数组创建
1）a = Array.new，有两个可选参数，第一个参数表示数组元素个数，默认值为0，第二个参数表示数组元素初始值，默认值是nil。

2）使用%w或者%i

创建不包含空白的字符串数组时， 可以使用 %w:
```ruby
lang = %w(Ruby Perl Python Scheme Pike REBOL)
p lang #=> ["Ruby", "Perl", "Python", "Scheme", "Pike", "REBOL"]
```
Ruby2.0 还提供了创建符号（ Symbol） 数组的 %i：
```ruby
lang = %i(Ruby Perl Python Scheme Pike REBOL)
p lang #=> [:Ruby, :Perl, :Python, :Scheme, :Pike, :REBOL]
```
创建数组时使用了 () 将数组元素括了起来， 但实际上还可以使用如 <>、 ||、 !!、 @@、 AA 这样的任意字符。

3）使用to_a方法
很多类都定义了 to_a 方法， 该方法能把该类的对象转换为数组：
```ruby
color_table = {black: "#000000", white: "#FFFFFF"}
p color_table.to_a #=> [[:black, "#000000"],[:white, "#FFFFFF"]]
```
4）使用字符串的 split 方法。
1．5．2通过 [] 指定索引， 获取元素
（a） a [n]，n为非负整数，从数组的开头获取元素，如a[0]表示数组的第一个元素，n为负数，从数组的末尾获取元素，如a[-1]表示数组的最后一个元素，n大于元素个数返回nil；
（b） a [n..m] 或者 a [n...m]，n..m(闭区间对象),n…m(左闭右开区间对象)，a[n..m]表示获取从 a [n] 到 a [m] 的元素， 然后用它们创建新数组并返回，a[n…m] 表示获取从 a [n] 到 a [m-1] 的元素， 然后用它们创建新数组并返回；
（c） a [n, len] 表示从 a [n] 开始， 获取之后的 len 个元素， 用它们创建新数组并返回。
1．5．3作为集合的数组
交集：ary = ary1 & ary2
并集：ary = ary1 | ary2
集合的差：ary = ary1 - ary2
```ruby
ary1 = [“a”,”b”,”c”]
ary2 = [“b”,”c”,”d”]
p (ary1 & ary2) #=>[“b”,”c”]
p (ary1 | ary2) #=>[“a”,”b”,”c”,”d”]
p (ary1 – ary2) #=>[“a”]
```
“|”与“+”的不同点:
```ruby
num = [1, 2,3]
even = [2, 4, 6]
p (num + even) #=> [1, 2, 3, 2, 4, 6]
p (num | even) #=> [1, 2, 3, 4, 6]
```
1.5.4作为列的数组,即将数组当作栈和队列使用
1）push 方法和 pop 方法可以实现栈；
2）push 方法和 shift 方法可以实现队列

|          | 对数组开头的元素操作 | 对数组末尾的元素操作 |
|:--------:|:------------------:|:-----------------:|
|  追加元素 |      unshift       |         push      |
|  删除元素 |      shift         |         pop       |
|  引用元素 |      first         |         last      |

关于数组的更多内容，请参考手册。

1.6 Hashes（散列表）
1．6．1 散列的创建
1）使用 { 键 => 值}：
```ruby
h1 = {"a"=>"b", "c"=>"d"}
p h1["a"] #=> "b"
```
2）使用{ 键: 值}：
```ruby
h2 = {a: "b", c: "d"}
p h2 #=> {:a=>"b", :c=>"d"}
```
3）使用 Hash.new：
Hash.new 是用来创建新的散列的方法。 若指定参数， 则该参数值为散列的默认值， 也就是指定不存在的键时所返回的值。 没指定参数时， 散列的默认值为nil。

1．6．2对散列表键值的要求
散列表键必须能够响应hash消息并返回一个散列码（hash code），并且某个键对应的散列码不能改变。散列表中使用的键也必须能使用eql？来比较。如果eql？在比较两个键是返回真，那么这两个键必定具有相同的散列码。这意味着某些类（例如数据和散列）不适合做键，因为他们的hash值可能会随着其内容而发生变化。

1．6．3 键最好使用Symbols(符号)
符号是前面带有冒号的标识符，类似于:symbol的形式。它在给事物和概念命名时非常好用。两个同值字符串在物理上是不同，但相同的符号却是同一物理对象。

1．6．4散列的应用
Ruby虽然不支持命名参数， 但可以用散列表来模拟它。只要加进一颗小小的语法糖，你就能获得一些有趣的特性：
```ruby
>> def tell_the_truth(options={})
>>    if options[:profession] == :lawyer
>>       'it could be believed that this is almost certainly not false.'
>>    else
?>       true
>>    end
>> end
=> :tell_the_truth
>> tell_the_truth
=> true
>> tell_the_truth :profession=>:lawyer
=> "it could be believed that this is almost certainly not false."
```
该方法带一个可选参数。如果不传入该参数， options将设为空散列表，但如果传入:profession=>:lawyer，返回结果就有所不同。它不会返回true，但因为Ruby的求值机制将字符串也当作true处理，所以这和返回true几乎毫无差别。还需注意，这里的散列表不必用大括号括起来，因为将散列表用作函数的最后一个参数时，大括号可有可无。

1．6．5 散列与数组的对比
和数组相比，Hashes有一个突出的优点：几乎可以用任何对象做索引。然而它有一个突出的缺点：他的元素是无序的一次很难使用hash来实现栈和队列。

1．7 Regexp（正则表达式）
1．7．1 正则表达式对象的创建
1）/模式/
2）re = Regexp.new(“模式”)
3）re = %r(模式)，()可以换成<>,||,!!等等。
1．7．2正则表达式的模式与匹配
1）正则表达式 =~ 字符串，=~ 方法是正则表达式中常用的方法， 可以用来判断正则表达式与指定字符串是否匹配。
2）正则表达式 !~ 字符串，!~ 是=~的取反，来颠倒“真”与“假”。

无趣的基础知识终于结束了。

2.定义函数
```ruby
>> def say_hello(name)
>>    puts "hi,#{name}"
>> end
=> :say_hello
>> say_hello "xxx"
hi,xxx
=> nil
```
每个函数都会返回结果。如果你没有显式指定某个返回值，函数就将返回退出函数前最后处理的表达式的值。像所有其他事物一样，函数也是个对象。

3.代码块和yield

代码块是包括在花括号（习惯上，代码在一行时使用花括号）或者do/end（习惯上，多行代码使用do/end）对中的能与参数一起传递的多个处理的集合。看一下昨天的一个习题，看是怎么使用代码块的：
```ruby
>> (1..2).each {|i| puts "This is sentence number #{i}"}
This is sentence number 1
This is sentence number 2
```
这有点类似于C++中将一个函数指针传给一个方法，然后在方法中调用这个函数。那Ruby是怎样调用这个代码块的呢？让我们来自己来实现一个类似each方法my_each：
```ruby
>> (1..2).my_each { |x| p x }
NoMethodError: undefined method `my_each' for 1..2:Range
from (irb):1
from d:/Ruby22/bin/irb:11:in `<main>'
```
在还没有为Range添加my_each实例方法前，会提示错误，下面为Range添加一个实例方法：
```ruby
>> class Range
>>      def my_each
>>         f = first
>>         l = last
>>         e = first
>>         loop do
?>             yield e
>>             break self if e == l
>>             e = e.succ
>>         end
>>      end
>> end
=> :my_each
>> (1..2).my_each { |x| p x }
1
2
```
从这个例子可以看出，代码块的使用和调用方法，调用方法时将代码块紧接在方法之后，在方法中通过yield调用传过来的代码块。这个例子有个值得一提的地方，我们居然给一个基本数据类型Range添加了一个方法，这里面的奥秘以后再详细介绍。

代码块能让你把可执行代码派发给其他方法。除此之外，代码块还有延迟执行等诸多作用。

4.定义类
根据以往的经验，面向对象编程意味着要将大量的时间用于定义类。在Java，C++等面向对象编程语言当中，类的定义只是在跟编译器签订契约，约定类的各种行为。此时，编译器其实并没有做什么实质性的工作，直到创建对象，然后调用方法才会有实际的工作。

Ruby于此有所不同，Ruby中的类在定义时就已经是实实在在的执行类中的代码了。
Ruby也支持继承，Ruby中的类只能继承自一个类。看代码：
```ruby
>> 4.class
=> Fixnum
>> 4.class.superclass
=> Integer
>> 4.class.superclass.superclass
=> Numeric
>> 4.class.superclass.superclass.superclass
=> Object
>> 4.class.superclass.superclass.superclass.superclass
=> BasicObject
>> 4.class.superclass.superclass.superclass.superclass.superclass
=> nil
```
从这个继承关系，我们立刻就能得到Ruby中的继承关系图：
{% asset_img 图二.png 图二 %}
等等，再看看下面的代码：
```ruby
>> 4.class.class
=> Class
>> 4.class.class.superclass
=> Module
>> 4.class.class.superclass.superclass
=> Object
>> 4.class.class.superclass.superclass.superclass
=> BasicObject
>> 4.class.class.superclass.superclass.superclass.superclass
=> nil
```
我们根据这个关系，又能得出如下关系图：
{% asset_img  图三.jpg 图三 %}
请注意第一句话，4.class.class，4.class是Fixnum：说明4是Fixnum的实例对象，4.class.class即Fixnum.class是Class（请注意这里的大小写），这里表示，Fixnum是Class的实例对象，什么鬼？一个类是另一个类的实例!!!这是要逆天吗？好吧，先来看看书上的继承图（图中少了BasicObject类， Ruby1.9之前是没有BasicObject）：
{% asset_img 图四.png 图四 %}
现在来解释解释：一切从我们的口号说起：一切都是对象。明白了吗，上面的东西都是对象，类也是对象，不信，请看看下面的代码：
```ruby
>> Object.class
=> Class
>> Module.class
=> Class
>> Class.class
=> Class
>> Numeric.class
=> Class
>> Integer.class
=> Class
>> Fixnum.class
=> Class
```
这些类都是Class类的对象，就连Class本身也是Class的对象。现在就能解释的通定义类时，其实在实例化一个对象，所以它在执行类中的代码（注意方法中的代码是不会执行的）很正常。根据Ruby中的命名规则（常量、类和模块都是以大写字母开头），可以知道，其实类就是一个Class类的实例常量。用图总结如下：
{% asset_img 图五.jpg 图五 %}

5.编写Mixin
类已经可以定义了，接下来解决继承问题，由于Ruby是单继承的，那要怎样同时继承自两个及以上的类呢？Java通过接口，C++本来就支持多继承，Ruby是通过Mixin（混入）来实现的。其实就是定义一个module，然后把这个module包含近类。那么module中的方法就继承过来了。看代码：
```ruby
>> module M
>> def m_func
>> puts "in M"
>> end
>> end
=> :m_func
>> class C
>> include M
>> def c_func
>> puts "in C"
>> end
>> end
=> :c_func
>> obj = C.new
=> #<C:0x2483010>
>> obj.m_func
in M
=> nil
>> obj.c_func
in C
=> nil
```
从这个例子可以看出，通过Mixin技术，就能解决多继承问题，而且这种依赖关系是隐式的，不像Java使用接口实现的多继承，在Java中继承接口，必须显式实现接口中的方法。

6. 模块、可枚举和集合
Ruby有两个至关重要的mixin： 枚举（enumerable）和比较（comparable） 。如果想让类可枚举，必须实现each方法；如果想让类可比较，必须实现<=>操作符。 <=>被人们叫做太空船操作符，它比较a、 b两操作数， b较大返回1， a较大返回1，相等返回0。为避免方法实现之苦，集合已实现了许多便于使用的可枚举和可比较的方法。如：由于整数已通过Fixnum类实现了太空船操作符，因此可以调用sort方法排序，还可以调用min和max方法计算最小值和最大值。举个可枚举的例子：
```ruby
>> a = [1,2,3,4,5]
=> [1, 2, 3, 4, 5]
>> a.inject(0) do |sum,i|
?>    puts "sum: #{sum}     i: #{i}     sum + i: #{sum + i}"
>>    sum + i
>> end
sum: 0     i: 1     sum + i: 1
sum: 1     i: 2     sum + i: 3
sum: 3     i: 3     sum + i: 6
sum: 6     i: 4     sum + i: 10
sum: 10     i: 5     sum + i: 15
=> 15
```
7.小结
今天主要是简单介绍了一些关于基本数据类型、函数、代码块、类、模块和Mixin。集合简直太好用了：用得最多的两个集合都带有众多API。 Ruby关注的是程序员的效率，应用程序的效率是次要的。枚举模块让你品尝到Ruby良好设计的味道，单继承的面向对象结构虽不是什么新鲜事物，但Ruby的实现充满了符合直觉和实用的特性。如此程度的抽象并没有为Ruby带来本质上的变化，真正点石成金的魔法还在后面。


















































