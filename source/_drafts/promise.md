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
```js
let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
};
```
Promise.resolve方法会将这个对象转为Promise对象,然后立即执行thenable对象的then方法
(3) 参数不是具有then方法的对象,或根本不是对象
```js
const p = Promise.resolve('Hello');
p.then(function(s) {
    console.log(s); //  Hello
})
```
Hello不属于异步操作(判断方法是字符串对象不具有then方法),返回Promise实例的状态从一生成就是resolved,所以回调函数会立即执行.Promise.resolve方法的参数,会同时传给回调函数
(4) 不带有任何参数
Promise.resove方法允许调用时不带参数,直接返回一个resolved状态的Promise对象
```js
setTimeout(function() {
    console.log('three');
}, 0);

Promise.resolve().then(function() {
    console.log('two');
});

console.log('one');

// one
// two
// three
```
上面代码中, setTimeout(fn, 0)在下一轮"事件循环"开始执行, Promise.resolve()在本轮"事件循环"结束时执行,console.log('one')则是立即执行,因此最先输出

## 8. Promise.reject()

## 9. 两个有用的附加方法
Promise.done()

Promise对象的回调链,不管以then方法或者catch方法结尾,要是最后一个方法抛出错误,都有可能无法捕捉到(因为Promise内部的错误不会冒泡到全局),因此我们可以提供一个done方法,总是处于回调链的尾端,保证抛出任何可能的错误
```js
asyncFunc()
  .then(f1)
  .catch(r1)
  .then(f2)
  .done();
```
finally()

finally方法用于指定不管Promise对象最后状态如何,都会执行的操作,它与done方法的最大区别,接受一个普通的回调函数作为参数,该函数不管怎样都必须执行.
下面是一个例子,服务器使用Promise处理请求,然后使用finally方法关掉服务器

```js
server.listen(0)
 .then(function() {

 })
 .finally(server.stop);
```

