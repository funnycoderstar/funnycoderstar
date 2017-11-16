---
title: 两句话理解js中的this
date: 2017-11-16 22:18:03
tags: javascript
categories: javascript
type: "tags"
---
![this](http://s2.51cto.com/wyfs02/M00/88/9A/wKioL1f83IXiORmNAAC9J-tzq-k871.jpg-wh_651x-s_1446494838.jpg)
<!--more-->

前言: 一直都搞不清javascript中this的指向,`<你不知道的javascript(上卷)>`这本书中有3章都是在讲解this,去年第一次看完还是觉得似懂非懂的,一深入的问还是不清楚,现在在看一遍,真心觉得这本书里将的是真好,想深入了解一下的,这本书是一个不错的选择.

下面我就简单的说一下我的理解,用两句话记住了javascrpt中this的指向:
# this的指向

- 普通函数指向函数的调用者:有个简便的方法就是看函数前面有没有点,如果有点,那么就指向点前面的那个值;
- 箭头函数指向函数所在的所用域: 注意理解作用域,只有`函数的{}`构成作用域,`对象的{}`以及 `if(){}`都不构成作用域;

```js

// 
const obj = {
    name: 'objName',
    say() {
        console.log(this.name);
    },
    read: () => {
        console.log(this.name);
    }
}
obj.say(); // objName
obj.read(); // undefined


```
- 普通函数,调用者是obj,所以结果是 objname;也是理解`say()`是普通函数,前面有点,所以`this`指向`obj`;
- 箭头函数,this指向函数所在的作用域,当前的作用域为全局环境,所以`this.name`为`undefined`,
- 举下面的例子更清楚的了解一下箭头函数this的指向,箭头函数所在的作用域是普通函数`say`,`say()`的调用者是obj
```js
const obj = {
    say: function () {
        setTimeout(() => {
            console.log(this)
        });
    }
}
obj.say(); // obj,此时this指的是定义他的obj
```

## 补充知识点
- 浏览器默认的this为window
```js
function test() {
    console.log(this);
}
test(); //window
```
- node.js中全局环境默认`this为{}`,普通函数中默认`this为global`
```js
console.log(this); // {}

function test() {
    console.log(this);
}
test(); //global
```
