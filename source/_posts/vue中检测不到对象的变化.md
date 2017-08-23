---
title: vue中检测不到对象的变化
date: 2017-08-23 10:46:53
tags: vue
---
![title](http://upload-images.jianshu.io/upload_images/1541368-d9be1b3b39abc037?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
<!--more-->

```js
 data() {
     return {
         a: {},
     };
 },
 created() {
     setTimeout(() => {
         this.a.b = 1;
     }, 1000)
 },

```
###### tips1: js取值的两种方式的区别
```js
const obj = {abc:"ss",nn:90};
const v1 = obj.abc; // 使用点的方式
const v2 = obj["abc"]; // 使用中括号的方式
```
在实际项目中一般使用.会方便很多,但是key是变量的话就不能使用.,js对象会理解变量为对象的key值,

```js
const v3 = obj[key];
```

###### tips2: 对象深拷贝实现方法
>  先解释什么是深拷贝和浅拷贝
- 浅拷贝是对对象地址的复制,并没有开辟新的栈,复制的结果是两个对象指向同一个地址,修改其中一个对象的属性,另一个对象的属性也会改变
- 深拷贝是开辟新的栈,两个对象对应两个不同的地址,修改一个对象的属性,不会改变另一个对象的属性
> 最简单的如下
```js
b = JSON.parse( JSON.stringify(a) )
```
但是会存在一些问题
- 无法复制函数
- 原型链没了，对象就是object，所属的类没了。
> 使用递归
```js
const obj1 = {
    name: 'cehsi',
    age: 13,
    friends:['sk','ls'],
}
function deepCopy(o, c) {
    var c = c || {};
    for(const i in o) {
        if(typeof o[i] === 'object') {
            // 判断是对象
            if(o[i].constructor === Array) {
                // 数组
                c[i] = [];
            } else {
                c[i] = {};
            }
            deepCopy(o[i], c[i]);
        } else {
            c[i] = o[i];
        }
    }
    return c;
}
let obj2 = {name: 'result'};
obj2 = deepCopy(obj1, obj2);
console.log(obj2); // { name: 'cehsi', age: 13, friends: [ 'sk', 'ls' ] }
obj2.age = 20;
console.log(obj2, obj1); // { name: 'cehsi', age: 20, friends: [ 'sk', 'ls' ] } { name: 'cehsi', age: 13, friends: [ 'sk', 'ls' ] }
```
> [使用npm install deepcopy](https://www.npmjs.com/package/deepcopy)