---
title: react文档
date: 2017-11-07 21:45:30
tags: react
---
## 处理事件要注意的点
1,react的合成事件是在浏览器本地事件的一个跨浏览器包装的实例,其中阻止默认和防止冒泡的事件不用再次处理兼容问题`e.preventDefault()`和`e.stopPropagation()`
2,注意this的用,在javascript中,this必须自己手动绑定传递给onClick(),否则在函数被实际调用的时候是undefined,有下面两种解决办法:
在构造函数中绑定
```js
class LoggingButton extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```
或者箭头函数的形式

```js
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
// 或者在回调中使用箭头函数
<button onClick={(e) => this.handleClick(e)}>
    Click me
</button>

```
3,将参数传递给事件处理程序: `箭头函数`和`Functio.Prototype.bind`
```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
e表示React事件的参数都将作为ID之后的第二个参数传递,但是bind更多的参数会被自动转发

## react中数组渲染的时候的key的作用

key帮助react标识哪一个元素改变,删除或添加


具体原因举一个最简单的例子:
```js
<ul>
    <li>aaa</li>
    <li>bbb</li>
</ul>
// 变为
<ul>
    <li>aaa</li>
    <li>ccc</li>
    <li>bbb</li>
</ul>
```
上面代码中,就是在中间位置添加了一个元素`<li>ccc</li>`,如果不加key值,新变化后的代码和原来的代码,依次(按照下标)对比,并在原来的代码上进行一些修改变为新的代码
0: `<li>aaa</li>`和`<li>aaa</li>`,没有变化,不重新渲染;
1: `<li>ccc</li>`和`<li>bbb</li>`,先删除`<li>bbb</li>`,再添加`<li>ccc</li>`;
2: `<li>bbb</li>`和 '',添加 `<li>bbb</li>`;

以我们的思维来看上面的变化,实际做了一些无用功,只需要的中间插入`<li>ccc</li>`这个即可,所有这就是key的作用,如果存在key值,会先找到之前存在的元素的跟这个一样的key值,然后这两个key值相同的元素做对比,如果在原来的元素中没找到key值,说明是新添加的,如果已存在的元素中有新元素中不存在的key值,也是需要删除,这样会节省很大一部分性能,

一般不用index(下标)来作为key,
因为每个元素对应的下标不能保证他是一直不变的,所以下标为key值,遇到直接在后面依次添加的,是没有任何问题的,但是要是不是依次的,此时,这个以下标为key就变得毫无意义



