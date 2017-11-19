---
title: 初探React生命周期
date: 2017-11-14 13:14:27
tags: react
categories: react
type: "react"
---
![title](http://static.open-open.com/lib/uploadImg/20151028/20151028165606_134.jpg)
<!--more-->
# react生命周期
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
![react生命周期](http://oo4xdz5i0.bkt.clouddn.com/reactLife.jpeg)

## About
[github](https://github.com/funnycoderstar)
[blog](http://wangyaxing.top/)