1,块级绑定
### 全局块级绑定
-  使用var声明时会创建一个全局变量,同时也是全局对象(浏览器wnidow)的一个属性,这意味着全局对象的属性可以被重写覆盖
```
// 在浏览器中运行
var a = 1;
console.log(window.a); // 1

var RegExp = "Hello!";
console.log(window.RegExp);     // "Hello!"
```
- 全局RegExp对象在window上已定义,但是var声明很容易就把他覆盖了.这就是javascipt的工作机制
如果使用let和const,那么绑定会发生在全局作用域内,但是不会向全局对象内部添加任何属性.这就意味着你不能使用let和const重写全局对象,而仅能屏蔽掉他们
```
// 在浏览器中运行
let RegExp = "Hello!";
console.log(RegExp);                    // "Hello!"
console.log(window.RegExp === RegExp);  // false

```
> 如果你想让代码可以被全局对象访问,你仍需要使用var