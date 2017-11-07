---
title: react之无状态组件
date: 2017-11-07 21:45:30
tags: react
---

1,react简介
React把用户界面抽象成一个组件，比如按钮组件Button,对话框组件Dialog,日期组件Calendar.开发者通过组合这些组件，最终得到功能丰富，可交互的页面
## 专注视图层
React专注于提供清晰，简洁的view层解决方案。
## Virtual DOM 
真实页面对应一个DOM树，在传统页面的开发模式中，每次需要更新页面时，都需要自动操作DOM来进行更新。
DOM操作非常昂贵，性能消耗最大的就是DOM操作，而且这部分代码会变得难以维护。React把真实DOM树转换成JavaScript对象树，也就是Virtual DOM
## 函数式编程

2，JSX语法
## JSX的由来
## JSX基本语法
3，react组件
## 组件的演变
## React组件的构建
4，react数据流
## state
## props

5，react生命周期
## 挂载和卸载过程
## 数据更新过程
## 整体流程
6，react与DOM
## ReactDOM
## ReactDOM的不稳定性
## refs
## React之外的DOM操作
