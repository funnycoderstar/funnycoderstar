---
title: for in vs for of
date: 2017-07-03 11:27:09
tags: javascript
categories: javascript
description: [javascript, for in, for of]
---
###  for in 和 for of 的区别

- for in 更适合遍历对象，不要使用for in 遍历数组

- for in 遍历的是数组的索引(即键名)，而for of 遍历的是数组元素值

```js
Object.prototype.methods = function () {
    console.log(this);
};
var myObject = {
    a: 1,
    b: 2,
    c: 3,
};
使用for in 遍历对象的键名
 for (var key in myObject) {
   console.log(key);
 }
 a
 b
 c
 methods
for in 可以遍历到myObject的原型方法methods，如果不想遍历原型方法和属性的话.可以用hasOwnPropery方法可以判断某属性是否是该对象的实例属性
 for (var key in myObject) {
     if(myObject.hasOwnProperty(key)){
       console.log(key);
     }
 }
 a
 b
 c

 console.log(Object.keys(myObject));  [ 'a', 'b', 'c' ]
Object.keys(myObject).forEach(function(key, index){
    console.log(key, myObject[key]);
})
 a 1
 b 2
 c 3
 同样可以通过ES5的Object.keys(myObject)获取对象的实例属性组成的数组，不包括原型方法和属性。
```

- for of 用来遍历数组的值
