---
title: promise
tags:
---
## 1. Promise
## 2. 基本用法
## 3. Promise.prototype.then()
## 4. Promise,prototype.catch()
该方法是`.then(null, rejection)`的别,名用于指定发生错误的函数;
promise对象的错误具有'冒泡'性质,会一直向后传递,知道被捕获为止,也就是说,错误总是被下一个`catch`语句捕获;
```js
const someAsyncThing = function() {
    return new Promise(function(resolve, reject){
        // 下面一行会报错,因为x没有声明
        resolve(x + 2);
    })
}
someAsyncThing()
.catch(function(error) {
    console.log('oh no', error);
})
.then(function() {
    console.log('carry on');
})

```
promise对象后面还是要跟catch()方法,这样可以处理Promise内部发生的错误,catch方法返回的还是一个promise对象,因此后面还可以调用then方法;
上面代码运行完catch方法指定的回调函数,接着会运行那个then()指定的回调函数,如果没有报错,则会跳过catch()方法

## 5. Promise.all()

Promise.all()方法用于将多个Promise实例,包装成一个新的Promise实例
```
const p = Promise.all([p1, p2, p3]);
```
上面代码中,promise.all方法接受一个数组作为参数, p1, p2, p3都是Promise实例,如果不是,就会调用Promise.resolve方法,将参数转为Promise实例,再进一步处理.(Promise.all方法参数可以不是数组,但必须有Iterator接口,且返回的每个成员都是Promise实例)

## 6. Promise.race()

Promise.race()将多个Promise实例,包装成一个新的Promise实例
```
const p = Promise.all([p1, p2, p3]);
```
上面代码中,只要p1, p2, p3之中有一个实例率先改变状态,p的状态就跟着改变,那个率先改变的Promise实例的返回值,就传递给p的回调函数

## 7. Promise.resolve()
将现有对象转为Promise对象,Promise.resolve()方法起到这个作用
```
Promise.resolve('foo');
// 等价于
new Promise(resolve => resolve('foo))

```
(1) 参数是Promise实例
如果参数是Promise实例,那么Promise.resolve将不做任何修改,原封不动的返回这个实例
(2)参数是一个thenable对象
```
let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
};
```
Promise.resolve方法会将这个对象转为Promise对象,然后立即执行thenable对象的then方法
(3) 参数不是具有then方法的对象,或根本不是对象
```
const p = Promise.resolve('Hello');
p.then(function(s) {
    console.log(s); //  Hello
})
```
Hello不属于异步操作(判断方法是字符串对象不具有then方法),返回Promise实例的状态从一生成就是resolved,所以回调函数会立即执行.Promise.resolve方法的参数,会同时传给回调函数
