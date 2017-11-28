---
title: javascript中基础但是很容易忽略的点(一)
date: 2017-11-27 16:11:44
tags: javascript
---
![title](http://img.mp.itc.cn/upload/20160714/5f2f7531f4ea4fc9b0ed7001e5d934bf_th.png)
<!--more-->
引言: 本篇文章主要总结了一些javascript中特别基础的内容,主要涉及到`DOM0级和DOM2级事件`,`事件流`, `事件委托`, `判断变量的类型`每次被问到,总是能想起一点,但是也总记不全,所以遇到这种情况的时候,就简单的记录一下.

## DOM0级事件和DOM2级事件的区别
### DOM0事件
- 在标签内写onclick事件
- 在js中写onclick=function(){}函数

```js
<input id="myButton" type="button" value="Press Me" onclick="console.log('thanks');" >
```

```js
document.getElementById("myButton").onclick = function () {
    console.log('thanks');
}
```
删除事件的方法是
```js
btn.onclick = null;
```
### DOM2级事件
监听方法: 两个方法用来添加和移除事件处理程序: addEventListener()和removeEventLister()
他们都有三个参数:
- 事件名(如click);
- 事件处理程序函数
- true表示在捕获阶段调用,false在冒泡阶段调用

> addEventListener()可以为元素添加多个处理程序函数,触发时按照添加顺序依次调用;removeEventLister()不能移除匿名添加的函数

### DOM0级事件和DOM2级事件的区别
DOM0级只能覆盖，不会连续触发！
像上面把onclick写在标签内，都是dom0级事件，fn和fn1依次执行; 第二种获取元素，绑定onclick事件也是dom0级，第二个会覆盖第一个onclick，也会覆盖行内的onclick，只会弹出222。
以上的绑定都属于dom2级事件绑定，前面两种都是jq的绑定方式，后面都是原生js的绑定方式，不会覆盖，会依次执行jq的绑定方法和原生的绑定方法，这就是于dom0级的去别处；

## 事件流
- 事件冒泡: 事件开始时是从最具体的元素接受,然后逐级向上传播: 比如点击了div, div->body->html->Document
- 事件捕获: 和事件冒泡相反,从最外面的元素向下传播: 比如同样点击了div: Document->html->body->div
“DOM2级事件”，规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先是事件捕获阶段；然后是实际的目标接收到事件。最后一个阶段是冒泡阶段，可以在这个阶段对事件作出相应。
![事件流](https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg)
所有的浏览器都支持冒泡,我们通常使用事件冒泡,很少使用事件捕获

## 事件委托(事件代理)及使用场景
### 事件委托原理: 
事件冒泡
### 使用场景:
DOM需要事件处理程序,一般都是直接给她这种事件处理程序;但是有很多个DOM需要添加相同的事件处理程序呢,比如,每个li都有相同的click事件,如果按照之前的做法,用for循环,给每个元素添加事件,可想而知,会出现什么样的问题;

javascript中,添加到页面上的事件程序直接影响到页面整体运行性能,因为需要不断的与DOM节点进行及哦啊胡,访问DOM次数越多,引起[浏览器重绘与重排](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)的次数也就越多,就会延长整个页面的交互准备时间,这就是为什么性能优化的重要思想之一就是减少DOM操作的原因;
每个函数都是一个对象,是对象就会占用内存,对象越多,内存占用率就越大,自然性能就越差;

这下子知道为什么使用事件委托,只对它的父级这一对象进行操作会大大节省内存和优化性能了吧;

事件委托的核心代码如下:

```js
 window.onload = function() {　　
    const ul = document.getElementById("ul");
    ul.onclick = function(ev) {　　　　
        const ev = ev || window.event;　　　　
        const target = ev.target || ev.srcElement;　　　　
        if (target.nodeName === 'li') {　　　　
            console.log(123);　　　　　
            console.log(target.innerHTML);　
        }　　
    }
}
```
Event对象提供了一个属性target,表示事件的目标节点,即触发该事件的节点(想具体了解一些这个事件的可以执行下面代码看浏览器的console内容)
```js
document.onclick = function(e) {
    console.log(e);
}
```

### 适合及不适合使用事件委托的事件
适合: click, mousedown, mouseup, keydown, keyup, keypress;
不适合:mouseover和mouseout虽然也有事件冒泡,但是需要经常计算他们的位置,处理起来有点麻烦;mousemove,每次都要计算它的位置,不好控制;还有一些本身没有冒泡的特性,如focus,blur等

> mouseenter事件类似于mouseover事件。唯一的区别是 mouseente事件不支持冒泡。


## 判断变量类型

> javaSctipt数据类型7种: Number, String, Boolean, Null, Undefined, Object, Symbol

### [typeof操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
可能返回的值如下
- undefined
- boolean
- string
- number
- object
- function
注意: typeof 的能力有限，其对于null, Date、RegExp类型返回的都是"object"
```js
typeof null // 'object'
typeof {}; // "object" 
typeof []; // "object" 
typeof new Date(); // "object"
```
使用场景:区分对象和原始类型,要区分一种对象类型和另一种对象类型,可以使用: instanceof运算符或对象contructor属性
### [instanceof运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
用法: 左边的运算数是一个object,右边运算数是对象类的名字或者构造函数;返回true或false
```js
[] instanceof Array; // true
[] instanceof Object; // true
[] instanceof RegExp; // false
new Date instanceof Date; // true
```
如果object是class或者构造函数的实例,则返回true,如果不是或者是null也返回false
instanceof运算符判断是否为数组类型
```js
function isArray(arr){ 
  return arr instanceof Array; 
}
```
### [contructor属性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
所有的对象都有一个constructor属性,指向该对象的基本对啊性构造函数类型的属性
```js
var a = new Array;
a.constructor === Array // true

var n = new Number(3);
n.constructor === Number; // true
```
判断为数组还可以这样
```js
function isArray(arr){ 
  return typeof arr === "object" && arr.constructor === Array; 
}
```

### [Object.ProtoType.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
每个对象都有一个toString()方法,返回"[object type]",其中type是对象的类型
当执行该方法时,执行以下步骤
1,获取对象的class属性
2,连接字符串 "[object "+结果1+"]" ;

所以可以通过toString()来获取每个对象的类型,为了每个对象都可以通过Object.protoType.toString()来检测,需要以Funciton.prototype.call()或Function.prototype.apply()的形式来调用,传递要检查的对象作为第一个参数,称为thisArg
```js
Object.prototype.toString.call(new Date); // "[object Date]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(/reg/ig); // "[object RegExp]"
```
## 跨域方法
js跨域是指js在不同的域之间进行数据传输或通信进行数据传输或通信,原因是浏览器都有一个[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy),限制之一为不能通过ajax的方法去请求不同源中的文档,限制之二是浏览器中不同域中的框架(iframe)之间也是不能进行js的交互操作的;
只要协议,域名,端口有任何一个不同,都被当做不同的域
### jsonp跨域
### document.domain跨子域
### window.name来进行跨域
### HTML5中的window.postMessage
window.postMessage(message, targetOrigin), 第一个参数是message为要发送的消息,类型只能为String,第二个参数targetOrigin用来限定接受消息的那个window对象所在的域,如果不想限定,可以使用通配符*;


## 作用域

## 参考
[JavaScript中判断对象类型的几种方法总结](http://www.jb51.net/article/43032.htm)
[js中的事件委托或是事件代理详解](http://www.cnblogs.com/liugang-vip/p/5616484.html)
[js中几种实用的跨域方法原理详解](https://www.cnblogs.com/2050/p/3191744.html)
