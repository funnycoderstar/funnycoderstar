---
title: react之无状态组件
date: 2017-11-18 21:45:30
tags: react
---

1,事件系统
Virtual DOM 在内存中是以对象形式存在的,如果想在这些对象上添加事件,就会非常简单,React基于Virtual DOM 实现了一个合成事件,我们所定义的事件处理器会接收到一个 syntheticEvent对象的实例,并且与原生的浏览器事件一样拥有同样的接口,同样支持事件冒泡机制,我们可以通过使用 stopPropagation()和 preventDefault()来中断它
## 合成事件的绑定方式
下面为JSX代码,
```js
 <button onClick={this.handleClick}>Test</button>
```
下面为DOM0级事件中直接设置HTML标签属性为事件处理器
```js
<button onclick="handleClick()">Test</button>
```
JSX: 1,驼峰的形式来书写事件的属性名(比如:onClick) 2,props的值可以为任意类型
HTML事件: 1,全部使用小写属性名(onclick)2,

## 合成事件的实现方式
2,表单
3,样式处理
4,组件间通信
5,组件间抽象
6,组件性能优化
7,动画
