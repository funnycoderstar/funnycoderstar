---
title: 'call,apply,bind'
tags:
---
三者都可以把一个函数绑定应用到其他对象上.call,apply是修改函数的作用域(修改this指向),并且立即执行,而bind是函数了一个新的函数,不是立即执行.call和apply的区别是apply接受数组作为参数,而call是接受逗号分隔的无限多个参数列表;
```js
Array.prototype.slice.call(null, args);

function getMax(arr) {
    return Math.max.apply(null, arr);
}
// call
function foo() {
    console.log(this); // { id: 42 }
}

foo.call({ id: 42 });

```
如果该方法是非严格模式代码的中的函数,则null和undefined将替换为全局对象,并且原始值将被包装.当你调用apply传递给它null时,就像是在调用函数而不是提供任何对象

bind返回一个新的函数
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
                <input type="text" value={age} onChange={e => this.handleChange('age', e)} />
            </div>
        );
    }
}

export default Controlled;
```
上述代码改成下面这样
```js
<input type="text" value={name} onChange={this.handleChange('name')} />
```
就会报错,具体原因是因为`this.handleChange('name')`是函数的调用返回值是undefined,而onChange后应该传的是一个函数,而不是函数调用;其中一个错误报`e is undefined`,同样也是因为`e`是onChange传过去的,但是现在这样却传了一个undefined过去;
改成`onChange={e => this.handleChange('age', e)}`这样就是给onChange传了一个函数
当然,除了这种方式,还可以向例子中给的那样用bind调用,其实bind里面的this传不传都行,因为handleChange是箭头函数,箭头函数的this指向所在作用域的this;
`onChange={this.handleChange.bind(null, 'name')}`,虽然是传不传this都行,但是必须传一个值,这跟bind的用法有关;

函数科里化

简单的说就是一个函数fun接受几个参数,对这个函数进行改造,改成几个函数fun1,fun2,...,每个函数只接受少数的参数,然后调用这几个函数的结果跟调用fun这个函数的结果是一样的;
call,apply返回函数的返回值
