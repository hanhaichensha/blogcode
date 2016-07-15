title: 读书笔记：Ruby篇（三）
tags:
  - Ruby
categories:
  - Ruby
date: 2015-07-29 22:35:00
---

引用一位“名人”的话：“世界上唯一不变的，就是什麽都在变”作为今天的开始。一切的乐趣就是在这无穷的变化之中。还记得在培训那会儿，迪奥斯·乔说过一句让人深省的话：“不是不能理解，只是不能适应，这种强加而来的编程方式，一切都要按照这个框架来”。当时，乔刚刚熟练C语言，继而进入MFC的世界，这种不适感体现的相当明显。从相当自由，一切都由自己掌控的C，到一切都要按照MFC框架的各种规则行事，这确实让人难以接受。面对这种困境，我们有两种选择，一种是改变自己，让自己适应这种被别人安排好的命运。还有一种就是改变你周遭的事物，让其适应我们的习惯存在着。我相信大部分人会选择后者，因为我们心向自由。今天就让我们来改变一下Ruby，编写一个能写程序的程序——元编程。只有改变一门语言的本来面目和行为方式，你才算真正掌握了赋予编程无穷乐趣的魔法。

1.对象模型

什么是对象模型？对象模型是所有语言构件所存在的系统。那什么是语言构件呢？语言构件就是组成语言的各个部件，如：类、模块、对象、方法等等。说白了就是类似于现实世界的一个抽象世界，组成在个抽象世界的不是现实世界中鸡猫狗，而是类、模块、对象等等。讲对象模型，就是搞清楚这些组成部件之间的关系，及它们之间的相互影响，就像要了解真实社会就要了解人际关系一样。现在让我们进入对象模型的世界：
<!--more-->
1.1 类的定义

前一天，简单的提了一下类的定义，但是我们并没有定义出一个具体的类，今天我们详细了解一下类。

类的定义方法：
```ruby
class 类名
     ……
     语句
     ……
     def 类方法
          方法语句
          ……
     end
     ……
end
```
说明：
a）类名必须是一大写字母开头；
b）方法定义与函数定义一样；
c）类定义语句和其他语句没有本质区别，你可以在类定义中放置任意语句。

对于第三点的进一步说明：
```ruby
3.times do
    class MyClass
        puts "Hello"
    end
end
Hello
Hello
Hello
```
输出了3次Hello，像执行其它代码一样，Ruby执行了类定义中的代码。有人或许会认为这里定义了三个同名的类。这是真的吗？请看代码：
```ruby
class MyClass
    def x; 'x'; end
end
class MyClass
    def y; 'y'; end
end
obj = MyClass.new
obj.x
=> "x"
obj.y
=> "y"
```
 从上面的例子中可以看出，它们是同一个类。第一次定义一个类时，类不存在，Ruby开始定义这个类，第二次定义这个类时，它已经存在，Ruby不再定义它，而是重新打开这个已存在的类，并为之添加新的定义。
从某种意义上说关键字class更像是一个作用域操作符而不是类型声明语句，它的核心任务是把你带到类的上下文，让你可以在其中定义方法。昨天my_each这个例子其实就是这种情况。你总是可以重新打开已经存在的类并对它进行动态修改，这种技术称之为"Open Class（开放类）"。

这项技术好像挺酷炫的，可以给任何类添加你想添加的功能。从这句话我们能清楚的听出，这是有问题的。当你给一个类添加一个新方法时，可能这个类已经有了这个方法，只是你不知道而已，这个时候，可能就会带来灾难。因此，有人给这种修订类的方式起了一个不太好听的名字：Monkeypatch（猴子补丁）。

1.2 类的真相

昨天，我通过分析得到类其就是对象这个结论，这点是毋庸置疑的。其实，在Java和C#中类也是名为Class类的实例，甚至在C#中有一种与Open Class功能相似的功能扩展方法，C#使用扩展方法为类添加新的方法。不过，在Java和C#中类的功能比对象的功能有限的多。

既然一切都是对象，那我们先来分析一下对象，对象中有什么呢？上代码：
```ruby
>> class MyClass
>>   def my_method
>>     @v = 1
>>   end
>> end
=> :my_method
>> obj1 = MyClass.new
=> #<MyClass:0x00000002f61330>
>> obj1.my_method
=> 1
>> obj2 = MyClass.new
=> #<MyClass:0x000000029bafa8>
```
说明：
a）定义了一个类MyClass，类中定义一个实例方法（my_method），和一个实例变量（@v）；
b）通过类创建了两个对象obj1和obj2。

在类中除了可以定实例方法、实例变量，还可以定义类方法、类变量，这些待会在介绍。通过这个例子我们可以知道在对象中应该是有实例变量和实例方法的。但是如果类中定义了实例变量，在对象中是否就一定有这个实例变量呢？代码说明一切：
```ruby
>> obj1.instance_variables
=> [:@v]
>> obj2.instance_variables
=> []
```
obj1调用了my_method()方法，产生了@v实例变量，而obj2没有调用，它没有任何实例变量。这与静态语言（如Java）不一样的地方，在Ruby中对象的类和他的实例变量没有关系，当给实例变量赋值时，他们就生成了。因此，对于同一个类，你可以创建具有不同实例变量的对象。

对象中除了有实例变量，还有方法。那方法存放在对象中吗？这个我们可以想象一下，每一个对象都有一份方法的拷贝，这明显不合理，存放在对象的类中，应该是最合理的选择，这样所有对象都可以共享代码。总结一下：一个对象的实例变量存放在对象本身，而一个对象的方法存放于对象所属的类，这就是为什么同一个类的对象共享方法，而不共享实例变量的原因。

现在有一个问题：我们知道类也是对象，那么刚才的那些规则是否也同样适用于类呢？是否也有类似的变量和方法呢？答案是肯定的，我们根据对象的规则来推导一下类。每个对象都有自己的实例变量，而所有对象共享方法。上面例子中obj1是类MyClass的对象，而我们知道所有的类都是类Class的对象。我们用仿上面的代码看看结果：
```ruby
>> class Class
>>   def my_method
>>     @v = 1
>>   end
>> end
=> :my_method
>> class MyClass1
>> end
=> nil
>> class MyClass2
>> end
=> nil
>> MyClass1.my_method
=> 1
>> MyClass1.instance_variables
=> [:@v]
>> MyClass2.instance_variables
=> []
```
与一般对象一样，一个对象的方法是它所属类的实例方法。这就意味着一个类的方法就是Class的实例方法：
```ruby
>> Class.instance_methods(false)
=> [:allocate, :new, :superclass, :my_method]
```
看到刚刚我么添加进去的方法了吧，而且你可以看到还有一个我们非常熟悉的new()方法，这是每个类都具有的类方法，我们创建对象用的就是这个类方法。allocate()方法是用来支撑new()方法的。superclass()方法用来返回一个类的超类。根据昨天的分析，我们知道Class的超类是Module，也就是说一个类只不过是一个增强的Module，只是添加了三个方法——new()、allocate()和superclass()而已，所以适用于类的规则大部分同样适用于Module。同时，可以看出Module不能实例化，因为它没有new方法。普通的变量是通过一个变量来引用它，而类是用一个常量来引用而已。

再来看看那个类的实例变量，这里要强调一下，这是类的实例变量，而不是类变量，昨天已经提到过，类变量是以@@开头的变量，现在我们所说的类实例变量是只有一个@符的变量，不要搞混了。类变量是可以被子类或者类的实例（即对象）所使用，类变量与Java中的静态成员更为相似。但是类变量有一个很不好的怪癖：
```ruby
>> @@v = 1
(irb):1: warning: class variable access from toplevel
=> 1
>> class MyClass
>>   @@v = 2
>> end
=> 2
>> p @@v
(irb):5: warning: class variable access from toplevel
2
=> 2
```
修改MyClass的类变量，顶级域下的一个类变量的值也发生了改变。具体原因，之后再解释。

对象和类的小结：对象是一组实例变量外加一个指向其类的引用。对象的方法并不存在于对象本身，而是存在与对象的类中。在类中，这些方法成为类的实例方法。类是一个对象（Class类的一个实例）外加一组实例方法和一个对其超类的引用。Class类是Module类的子类，因此一个类也是一个模块。类和对象本质是一样的，都有自己的实例方法和实例变量，只是叫法不一样而已。跟其他对象一样，类必须通过引用进行访问，只不过对象是通过变量，而类是通过常量（即类名）而已。最后给出一张图归纳一下：
{% asset_img 图一.png 图一 %}

 1.3 Ruby调用一个方法时发生了什么

当你使用obj1.my_method()调用方法时，Ruby是怎么做到的呢？答案其实很简单，Ruby只做了下面两件事，就实现了代码调用：

1）找到这个方法。这个过程称为方法查找；

2）执行这个方法。为了做到这点，Ruby需要一个叫做self的东西。

1.3.1方法查找

先来明确两个概念：接收者（receiver）和祖先链（ancestors chain）。接收者调用方法的那个对象，如：obj1.my_method()，obj1就是接收者。祖先链就是从对象所属类开始，逐个指向超类，直到BasicObject为止所形成的链路，如：从obj1的类MyClass开始，找到MyClass的超类Object，再找到Object的超类BasicObject，MyClass到Object再到BasicObject就是obj1的祖先链，这个定义有些问题，不过现在可以先这么理解。

下面来看看怎么找到一个方法：
```ruby
>> class MyClass
>>   def my_method;'my_method()';end
>> end
=> :my_method
>> class MySubclass < MyClass
>> end
=> nil
>> obj = MySubclass.new
=> #<MySubclass:0x00000003392af8>
>> obj.my_method()
=> "my_method()"
```
补充一点知识：class MySubclass < MyClass表示MySubclass继承自MyClass。

由于实例方法都保存在类中，所以当一个对象调用一个方法时，首先是找到对象所属的类，看看有没有要调用的方法，如果存在，则执行该方法；否则，则沿着祖先链向上找到该类的父类，在判断是否存在该方法，如果存在，则执行，否则，接着找，知道找到，并执行，如果整个祖先链都不存在，则报错。用这个方法分析一下我们的例子：从obj出发，找到obj所属类MySubclass，在MySubclass中没有找到my_method()方法，然后接着找MySubclass的超类MyClass，此时找到了my_method()方法，最后执行这个方法。

上面是比较简单的一种情况，让我们考虑一下多继承：
```ruby
>> module M
>>   def my_method
>>     'M#my_method()'
>>   end
>> end
>> class E
>>   def my_method
>>     'E#my_method()'
>>   end
>> end
>> class F < E
>>   include M
>> end
=> F
>> F.new.my_method()
=> "M#my_method()"
```
F类继承自E，同时通过Mixin方式include了模块M，而且此时E和M同时拥有一个my_method()方法。从最后的结果可以看出，F的对象调用my_method()最后找到的是模块M中的my_method()。这就是为什么说刚才的哪个祖先链的定义有问题，祖先链不仅仅只包含超类（也叫父类），还应该包含include进来的模块。而且他们寻找的顺序是：对象所属的类，对象所属类include进来的模块，而且如果有多个模块，那么查找顺序与include的顺序相反，然后才是超类，再后是超类include进来的模块，以此类推直到BasicObject。其实有一个很简单的方法可以查看祖先链：
```ruby
>> F.ancestors
=> [F, M, E, Object, Kernel, BasicObject]
```
这里面的Kernel，应该是一个模块，因为我们使用Object.superclass发现是BasicObject，也就是说Kernel是在Object类中include进来的一个模块。这个模块提供了很多让我们在任意代码中调用的函数，比如：print()等。由于我们创建的对象都是Object的子类，所以，当你给Kernel模块添加方法，其实就相当于添加一个内核方法，我们创建的类都能调用，哪怕它是一个私有方法！这里面的原因后面会详解。最后用一张图来加深F对象的方法查找：
{% asset_img 图二.png 图二 %}

1.3.2 执行方法
代码的执行使用代码本身和代码所处的上下文决定，例如：
```ruby
>> def my_method
>>   x = "Goodbye"
>>   yield("cruel")
>> end
>> x = "Hello"
>> my_method {|y| "#{x}, #{y} world"}
=> "Hello, cruel world"
```
我们将这段代码拆解成代码和上下文，代码本事就是上面的定义和代码块，那上下文是什么么呢？简单点说就是执行这段代码时的环境，比如：引用的的是哪个变量及变量当时的值，调用方法时，该调用哪个类或者模块的方法等等。为了弄明白这些，先来看两个概念：作用域和生存期。作用域指的是变量的可见范围。看例子：
```ruby
>> v1 = 1
>> class MyClass
>>   v2 = 2
>>   p local_variables
>>   def my_method
>>     v3 = 3
>>     p local_variables
>>   end
>>   p local_variables
>> end
[:v2]
[:v2]
>> obj = MyClass.new
>> obj.my_method
[:v3]
>> obj.my_method
[:v3]
>> p local_variables
[:obj, :v1, :_]
```
在类定义中的局部变量是v2，v1和v3不可见，即类定义时，不是v1和v3的作用域；在class定义外的局部变量是obj和v1，此时不是v2和v3的作用域；在类定义中的实例方法的定义中的局部变量是v3，此时不是v1和v2的作用域。由此可以看出：在Ruby中作用域的分界是由class、def和module关键词分开的，这些关键字都是一个作用域门（Scope Gate），当遇到一个作用域门，都会进行作用域切换。而且，在Ruby中没有作用域嵌套，外层作用域的变量在内层作用域不可见，比如v2在方法中不可见。在class/module与def之间还有一点微妙的差别。在类和模块定义中的代码会立刻执行，而方法中的代码只会在调用时执行。

再来看看生存期，变量的存在范围叫做生存期。拿刚才的哪个例子来说，局部变量v1在obj调用my_method时，作用域虽然进行了切换，在my_method中v1不可见，但是v1确实还存在，并没有被系统回收，当再次切换回之前的作用域时v1变量的有可见了。这就是生存期。

这两个概念都弄明白了后，我们回到上下文。在上下文中有一个非常重要的对象self，每一行代码都会在一个对象中执行——这个对象就是所谓的当前对象，也就是self。

<font color=red size=4>在给定时刻，只有一个对象能充当但前对象，但没有哪个对象能长期充当这一角色。特别地，当调用一个方法时，接收者就成为了self，当定义类或模块时，该类或者模块就是self。从这一刻起，所有的实例变量都是self的实例变量，所有没有指明接收者的方法都是在self上调用。当你调用其他对象的方法时，这个对象成为了self。</font>

看代码：
```ruby
>> class C
>> private
>>   def my_private_method
>>     p "in C private method"
>>   end
>> end
>> class D < C
>>   @v = 1
>>   def D.my_class_method
>>     p "in D class method"
>>     p "@v = #{@v}"
>>   end
>>   def my_method
>>     p "in C method"
>>     p "@v = #{@v}"
>>     my_private_method
>>   end
>> end
>> obj = D.new
>> obj.my_method
"in C method"
"@v = "
"in C private method"
>> D.my_class_method
"in D class method"
"@v = 1"
```
说明：

1）当obj调用my_method时，这时obj对象就是self，所以在my_method中，@v就是对象obj的实例变量，由于@v没有初始化第一次使用，所以会输出"@v = "，有人会说不对，@v不是在在之前赋值了吗？不请注意作用域，赋值的那条语句是在类定义当中，而现在我们实在方法当中，它们的作用域不一样，有着不一样的self引用。

2）在my_method对象实例方法中，还调用了my_private_method()方法，根据所有没有指明接收者的方法都是self调用，再根据方法的寻找规则，发现这个方法是超类的一个私有方法。这里先说明一下私有方法调用的唯一一条规则：不能明确指定一个接收者来调用一个私有方法，也就是说调用私有方法时，不能写成"接收者.私有方法()"，而是只能写成"私有方法()"，而Ruby还有一条规则：如果调用方法的接收者不是自己，则必须明确指明一个接收者。通过这两条规则得出：只能在自身中调用一个私有方法。这就是Ruby的私有方法所有要求，其他跟公有方法一样，这也就是说私有方法也是可以继承的，在子类中是可以调用父类的私有方法。但是，同一个类的两个对象x,y，x是不能调用y的私有方法的，例如：
```ruby
>> class Account
>> private
>> def balance
>>   @balance
>> end
>> public
>> def balance=(b)
>>   @balance = b
>> end
>> def greater_balance_than(other)
>>   return @balance > other.balance
>> end
>> end
>> a = Account.new
>> a.balance = 100
>> b = Account.new
>> b.balance = 200
>> a.greater_balance_than(b)
NoMethodError: private method `balance' called for #<Account:0x00000002f89e20 @balance=200>
        from (irb):11:in `greater_balance_than'
        from (irb):18
        from d:/Ruby21-x64/bin/irb:11:in `<main>'
```
这就是Ruby中的私有方法，与Java和C#的处理方式截然不同。
3）再来看看类方法my_class_method，我们已经知道类就是对象，也就是说调用my_class_method时的接收者就是D，此时self就是类D，而且类在定义时，self就是类本身：
```ruby
>> class C
>> p self.object_id
>> end
24491100
>> p C.object_id
24491100
```
看到了吧，定义类事的self的对象ID和C的对象ID一样，也就是说self和C引用的是同一对象。所以，在类方法my_class_method中可以访问@v实例变量，因为它们同属一个对象。

4）关于类方法的定义，根据前面的结论，我们知道所有类都是Class类的实例对象，只要在Class中添加一个实例方法就会为所有类添加一个类方法，但这显然是不合理的。从这个例子中我们知道可以在类定义中通过"类名.方法名"的方式来定义一个类方法。而且这个类方法只归这个类所有，要的就是这样一个效果。根据前面的经验，我们知道能应用于类的规则一般都能应用于对象，那是不是说我们也可以为对象添加一个只有某个对象特有的方法呢？答案还是肯定的，它就是单件方法。在进入单件方法之前，小结一下方法的执行：

方法的执行主要是跟踪当前执行代码的上下文和上下文的切换，上下文中主要是一些变量、常量和self的状态，其中self的最为复杂，但是只要你记住上面关于self的规则，方法执行就很容易理解了。而上下文切换更简单，只要记住class、module和def这三个作用域门即可知道在什么时候切换，至于切换成到哪个上下文，还是要看方法的接收者（对象或者类）。

1.3.3 Singleton Methods（单件方法）

有的时候你可能会遇到这样一种尴尬的情况：
```ruby
class Paragraph

     def initialize(text)

          @text = text

     end

     def title?; @text.upcase == @text; end

     def reverse; @text.reverse;end

     def upcase;@text.upcase;end

     ……

end
```
Paragraph类对一个字符串进行了封装，然后所有的调用都代理到字符串中，仅仅除了title?()方法。当然，这个时候你可以让Paragraph继承自String或者不封装这一层，直接给String添加一个实例方法。无论封装还添加实例方法，都有不妥之处，封装吧，感觉多此一举，这个类用的根本不多，添加方法吧，让所有的字符串都添加这个方法，对库进行了污染。下面让我们来使用单件方法来为某个对象添加title?()方法，其实很简单：
```ruby
>> paragraph = "this is a paragraph"
=> "this is a paragraph"
>> def paragraph.title?
>>   self.upcase == self
>> end
=> :title?
>> paragraph.title?
=> false
>> str = "this is a string"
=> "this is a string"
>> str.title?
NoMethodError: undefined method `title?' for "this is a string":String
        from (irb):7
        from d:/Ruby21-x64/bin/irb:11:in `<main>'
```
从上面的代码可以看出，只给paragraph添加了方法title?()，而且定义单件方法的格式是：

def 对象.单件方法

end

这和类的类方法定义是一模一样的（再重复一遍类就是对象），这就是单件方法。

一切看上去是这么的简单，但是我们在这问一问题：这个单件方法存放在哪呢？我们知道对象的实例变量存放在对象本身，这样每个对象都有不一样的实例变量，而对象的实例方法存放在类中，所有对象共享这些方法。现在的问题是，单件方法是某个对象独有，所以它不能存放在类中，难道它是存放在对象中？答案是否定的，在Ruby中，对象是不存放方法的，那它到底存放在何处？让我们进入到对象模型的最后一角——Eigenclass。

1.4 Eigenclass

当你用对象.class()获得对象所属类的时候，它对你说谎了，它把一个对象的直接父类隐藏亲来了，而告诉了这个类的父类（或叫超类），这个被隐藏的类就称为这个对象的eigenclass。一般情况下我们是无法感知它的存在的，不过我们可以通过Ruby基于class关键字的特殊语法，进入到eigenclass的作用域：
```ruby
class << an_object
#代码
end
例如：
>> obj = Object.new
>> eigenclass = class << obj
>> self
>> end
>> eigenclass.object_id
=> 1822180
>> obj.object_id
=> 26132360
>> obj.class.object_id
=> 1563580
>> eigenclass.superclass.object_id
=> 1563580
```
eigenclass和obj的对象id不一样，但是obj所属类的对象id和eigenclass父类的对象id一样，但这也只能说明eigenclass类是obj所属类的子类，并不能证明obj是eigenclass的实例。好吧，要证明这个对象是这个类的实例，我们只要往这个类中添加一个新方法(my_test_method)，如果是这个类的对象就应该可以调用这个方法，上代码验证一下：
```ruby
>> obj.my_test_method
NoMethodError: undefined method `my_test_method' for #<Object:0x00000002b91840>
        from (irb):5
        from d:/Ruby21-x64/bin/irb:11:in `<main>'
>> class << obj
>>   def my_test_method
>>     p 'in eigenclass test method'
>>   end
>> end
>> obj.my_test_method
"in eigenclass test method"
```
和我们的预想一致，在没有添加my_test_method方法前，obj调用该方法会提示没有定义，为eigenclass添加my_test_method方法后，obj就有了这个方法。有才可以得出：obj就是eigenclass的实例对象。

说到这你有没有明白点什么呢？在eigenclass中添加一个方法，obj就有了这个方法，而在obj.class得到的类中是不存在这个方法的，也就是说我们的单件方法就是存在eigenclass中。上添加的my_test_method就是obj的单件方法，于是我们得到了第二种添加单件方法的方法。同理你知道怎么给类添加类方法吗？

最后重新整理一下方法查找的路径（用"#C"表示C的eigenclass）：
{% asset_img 图三.png 图三 %}

关于类的eigenclass，这里就不重复了，虽然有点不一样，但原理差不多。

1.5 总结

Ruby的对象模型真的是迷人，虽然里面有类、eigenclass、模块、实例方法、类方法和单件方法，但是它是如此的统一。如果把eigenclass、普通类和模块放到一起，Ruby对象模型可以总结为7条规则：

1）只有一种对象——要买是普通对象，要买是模块；
2）只有一种模块——可以是普通模块、类、eigenclass或者代理类；
3）只有一个方法，他存在于一种模块中——通常是类中；
4）每个对象（包括类）都有自己的“真正的类”——要么是普通类，要么是eigenclass；
5）除了BasicObject类（在Ruby 1.8中是object类）无超类外，每个类都有且只有一个超类。这意味着从任何类只有一条向上直到BasicObject的祖先链；
6）一个对象的eigenclass的超类是这个对象的类；一个类的eigenclass的超类是这个类的超类的eigenclass;
7）当调用一个方法，Ruby先向进入接收者真正的类，然后进入祖先链，这就是Ruby查找方法的全部内容。

这就是Ruby的对象模型的全部内容。接下来让我们用Ruby编写能够编写代码的代码。

未完待续……