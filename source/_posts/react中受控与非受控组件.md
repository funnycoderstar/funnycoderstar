---
title: react中受控与非受控组件
date: 2017-12-12 13:22:15
tags: react
categories: react
type: "react"
---
![title](https://cdn-images-1.medium.com/max/1200/1*kt9otqHk14BZIMNruiG0BA.png)
<!--more-->
## 受控组件

```js
<input
    type="text"
    value={this.state.value}
    onChange={(e) => {
        this.setState({
            value: e.target.value.toUpperCase(),
        });
    }}
/>
```
`<input>`或`<select>`都要绑定一个change事件;每当表单的状态发生变化,都会被写入组件的state中,这种组件在React中被称为受控组件;在受控组件中,组件渲染出的状态与它的value或者checked prop向对应.react通过这种方式消除了组件的局部状态,是的应用的整个状态可控.react官方同样推荐使用受控表单组件,总结下React受控组件更新state的流程:
- 1.可以通过初始state中设置表单的默认值;
- 2.每当表单的值发生变化时,调用onChange事件处理器;
- 3.事件处理器通过合成事件对象e拿到改变后的状态,并更新应用的state.
- 4.setState触发视图的重新渲染,完成表单组件值得更新

> react中数据是单向流动的.从示例中,我们能看出来表单的数据来源于组件的state,并通过props传入,这也称为单向数据绑定.然后,我们又通过onChange事件处理器将新的表单数据写回到state,完成了双向数据绑定.

## 非受控组件
- 如果一个表单组件没有value props(单选按钮和复选按钮对应的是 checked props)时,就可以称为非受控组件;
- 使用defaultValue和defaultChecked来表示组件的默认状态;
- 通过 defaultValue和defaultChecked来设置组件的默认值,它仅会被渲染一次,在后续的渲染时并不起作用
```js
import React, { Component } from 'react';

class UnControlled extends Component {
    handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        console.log(this.name.value);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" ref={i => this.name = i} defaultValue="BeiJing" />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default UnControlled;

```

## 对比受控组件和非受控组件
将输入的字母转化为大写展示
```js
<input
    type="text"
    value={this.state.value}
    onChange={(e) => {
        this.setState({
            value: e.target.value.toUpperCase(),
        });
    }}
/>
```
直接展示输入的字母
```js
<input
    type="text"
    defaultValue={this.state.value}
    onChange={(e) => {
        this.setState({
            value: e.target.value.toUpperCase(),
        });
    }}
/>
```
### 1.性能上的问题
在受控组件中,每次表单的值发生变化,都会调用一次onChange事件处理器,这确实会带来性能上的的损耗,虽然使用费受控组件不会出现这些问题,但仍然不提倡使用非受控组件,这个问题可以通过Flux/Redux应用架构等方式来达到统一组件状态的目的.
### 2.是否需要事件绑定
使用受控组件需要为每一个组件绑定一个change事件,并且定义一个事件处理器来同步表单值和组件的状态,这是一个必要条件.当然,某些情况可以使用一个事件处理器来处理多个表单域
```js
import React, { Component } from 'react';

class Controlled extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            name: 'xingxing',
            age: 18,
        };
    }
    handleChange = (name, e) => {
        const { value } = e.target;
        this.setState({
            [name]: value,
        });
    }
    render() {
        const { name, age } = this.state;
        return (
            <div>
                <input type="text" value={name} onChange={this.handleChange.bind(this, 'name')} />
                <input type="text" value={age} onChange={this.handleChange.bind(this, 'age',)} />
            </div>
        );
    }
}

export default Controlled;
```

## 表单组件的几个重要属性
### 1.状态属性
React的form组件提供了几个重要的属性,用来显示组件的状态
- value: 类型为text的input组件,textarea组件以及select组件都借助value prop来展示应用的状态
- checked: 类型为radio或checkbox的组件借助值为boolean类型的selected prop来展示应用的状态
- selected: 该属性可作用于select组件下面的option上,React并不建议这种方式表示状态.而推荐在select组件上使用value的方式

### 2.事件属性
当状态属性改变时会触发onChange事件属性.受控组件中的change事件与HTML DOM中提供的input事件更为类似;


