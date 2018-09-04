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
React通过更新和构建`虚拟元素`来管理整个Virtual DOM的.
虚拟元素为真实元素的对应,它的构建和更新都是在内存中完成的,并不会真正渲染到DOM中.
React中创建的虚拟元素可以分为两类,DOM元素和组件元素,分别对应着虚拟DOM元素与自定义元素;
1,DOM元素
2,组件元素
## JSX基本语法一个标签包裹
- 定义标签时,只允许被
3，react组件
## 组件的演变
## React组件的构建
4，react数据流
## state
## props

5，react生命周期
## 挂载和卸载过程
1,组件挂载是最基本的过程,这个过程主要做组件状态的初始化.
```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
    // 1,这两个属性被声明成静态属性,意味着你也可以再类外面访问他们: App.propTypes和 App.defaultProps
    static propTypes = {
        // props的类型检查
    }
    static defaultProps = {
        // props的默认类型
    }

    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }
    // 2,componentWillMount和componentDidMount分别代表了渲染前后的时刻
    componentWillMount() {
        // 在render方法之前执行
    }
    componentDidMount() {
        //render方法之后执行
    }
    // 3,这个初始化过程没什么特别的,包括读取初始state和props以及这两个生命周期的方法componentWillMount和componentDidMount,这些都只会在组件初始化时运行一次
    // 4,如果我们在componentWillMount中执行setState方法,会发生什么呢?组件会更新state,但是组件只渲染一次,初始化的state都可以放在this.state
    // 5,我们在componentDidMount中执行setState方法,又会发生什么呢?组件当然会再次更新,不过在初始化阶段就渲染了两次,这并不是一件好事.
    // 但是实际的情况是,有一些场景不得不需要setState,比如计算组件的宽高时,就不得不让组件先渲染,更新必要的信息,再次渲染
    componentWillUnmount() {
        // 组件卸载只有componentWillUnmount,这是一个卸载前状态
        // 在这个方法中,我们常常会执行一些清理方法,如事件回收或是清理定时器
    }
    render() {
        return (
            <div>
                this is demo
            </div>
        );
    }
}

export default App;
```
## 数据更新过程
```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
    componentWillReceiveProps(nextProps) {
        // this.setState({})
    }
    shouldComponentUpdate(nextProps, nextState) {
        // return true
        // shouldComponentUpdate是一个特别的方法,他接受需要更新的props和state,让开发者增加必要的条件判断,让其在需要时更新.因此,当方法返回false的时候,组件不再向下执行生命周期方法
    }
    componentWillUpdate(nextProps, nextState) {
        // 需要提供更新的props和state
        // 这里不能执行setState
    }
    componentDidUpdate(prevProps, prevState) {
        // 提供更新前的props和state
    }
    render() {
        return (
            <div>
                this is demo
            </div>
        );
    }
}

export default App;
```
- 如果组件自身的state更新了,那么会依次执行shouldComponentUpdate,componentWillUpdate,render, componentDidUpdate.
>   shouldComponentUpdate是一个特别的方法,他接受需要更新的props和state,让开发者增加必要的条件判断,让其在需要时更新.因此,当方法返回false的时候,组件不再向下执行生命周期方法
    本质是用来进行正确的组件渲染(也是性能优化的手段之一):
    当父节点props改变的时候,在理想情况下,只渲染在一条链路省有相关props改变的节点即可,但是默认情况下,React会渲染所有的节点,因为shouldComponentUpdate默认返回true
    值得注意的是,无状态组件是没有生命周期方法的,这也意味着它没有shouldComponentUpdate,渲染到该类组件时,每次都会重新渲染,不少开发者在使用无状态组件开发的时候都会纠结这一点,为了更方心得使用,我们可以选择用Recompose库的pure方法;
    const optionmizeComponent = pure(ExpensiveComponent)
    pure方法做的事情就是将无状态组件转换成class语法加上PureRender后的组件

- 如果组件是由父组件更新props而更新的,那么在shouldComponentUpdate之前会先执行componentWillReceiveProps方法,此方法可以作为React在props传入后,渲染之前setState的机会,在此方法中调用setState是不会二次渲染的
## 整体流程
React的生命周期流程我们用一张图来表示
![react生命周期整体流程图](https://cdn.wangyaxing.cn/reactLife.jpeg)
6，react与DOM
## ReactDOM
## ReactDOM的不稳定性
## refs
## React之外的DOM操作
