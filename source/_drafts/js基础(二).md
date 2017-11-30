---
title: javascript中基础但是很容易忽略的点(二)
date: 2017-11-29 16:11:44
tags: javascript
---
![title](http://img.mp.itc.cn/upload/20160714/5f2f7531f4ea4fc9b0ed7001e5d934bf_th.png)
<!--more-->
引言: 本篇文章主要总结了一些javascript中特别基础的内容,主要涉及到`DOM0级和DOM2级事件`,`事件流`, `事件委托`, `判断变量的类型`每次被问到,总是能想起一点,但是也总记不全,所以遇到这种情况的时候,就简单的记录一下.

## 跨域方法
js跨域是指js在不同的域之间进行数据传输或通信进行数据传输或通信,原因是浏览器都有一个[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy),限制之一为不能通过ajax的方法去请求不同源中的文档,限制之二是浏览器中不同域中的框架(iframe)之间也是不能进行js的交互操作的;
只要协议,域名,端口有任何一个不同,都被当做不同的域

script, image, iframe的src都不受同源策略的影响;

### jsonp跨域
js中用XMLHttpRequest请求不同的域上的数据,存在跨域问题,但是如果直接在页面中引用j引用不同域的js脚本却是可以的,jsonp正是利用这个特性;
包含两部分: 回调函数和数据

做法: 

### document.domain跨子域
例如a.qq.com嵌套一个b.qq.com的iframe,如果a.qq.com设置document.domain为qq.com


### window.name来进行跨域
### HTML5中的window.postMessage
window.postMessage(message, targetOrigin), 第一个参数是message为要发送的消息,类型只能为String,第二个参数targetOrigin用来限定接受消息的那个window对象所在的域,如果不想限定,可以使用通配符*;

### CORS

## 作用域

## 参考
[js中几种实用的跨域方法原理详解](https://www.cnblogs.com/2050/p/3191744.html)
