---
title: 简单实现一个Virtual DOM
date: 2018-04-23 11:52:15
tags:
---
## 前言
之前写过一篇文章[为什么使用v-for时必须添加唯一的key?](http://wangyaxing.top/2018/03/18/2018-03-18-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8v-for%E6%97%B6%E5%BF%85%E9%A1%BB%E6%B7%BB%E5%8A%A0%E5%94%AF%E4%B8%80%E7%9A%84key/),但是解释的不是很深刻，其实真正的原因还需要从Virtual DOM的实现上解释；本篇文章从简单实现一个Virtual DOM入手，去解释一下Virtual DOM的实现思想;

源码地址：[github](https://github.com/funnycoderstar/simple-virtual-dom)

## 思路
1.定义一个类,用来创建 DOM 元素(element.js);

2.比较新旧 DOM 树的差异(diff.js);

3.将差异的部分渲染到DOM树即只渲染变化了的部分(patch.js)


## virtural-dom的模型
一个DOM标签所需的基本元素
- 标签名
- 节点属性,包含样式,属性,事件
- 子节点
- 标识id
```js
{
    // 标签名
    tagName: 'div',
    // 属性
    properties: {
        // 样式
        style: {},
    },
    // 子节点
    children: [],
    // 唯一标识
    key: 1,
}
```
## 过程

### 一:  用javascript对象表示DOM结构

为了实现这个需求，下面使用element.js。

原理: 

1.根据 tagName 使用 `document.createElement`创建元素

2.根据 props 使用 `setAttribute`给元素设置属性

3.根据 innerHtml 使用 `document.createTextNode` 渲染文本节点

4.根据是否有 children (子元素) 去递归渲染

5.最后使用`appendChild`将创建的元素插入到页面中

然后代码和使用方式如下

element.js

```js
class Element {
    constructor(tagName, ...args) {
        this.tagName = tagName;
        // 判断下面还有没有子元素
        if(Array.isArray(args[0])) {
            this.props = {};
            this.children = args[0];
        } else {
            this.props = args[0];
            this.children = args[1];
        }
        this.key = this.props.key || void 0;
    }
    render() {
        // 创建一个元素
        const $dom = document.createElement(this.tagName);
        // 给元素加上所有的属性
        for(const proKey in this.props) {
            $dom.setAttribute(proKey, this.props[proKey]);
        }
        // 如果存在子节点
        if(this.children) {
            this.children.forEach(child => {
                // 如果子元素还包含子元素,则递归
                if(child instanceof Element) {
                    $dom.appendChild(child.render());
                } else {
                    $dom.appendChild(document.createTextNode(child))
                }
            });
        }
        return $dom;
    }
};
export default Element;
```

```js
 const tree = new Element('div', {classname: 'div'}, [
    new Element('h1', {style: 'color: red;'},['Hello, This is my Vdom library']),
    new Element('ul', [
        new Element('li', ['1111']),
        new Element('li', ['2222']),
    ])
]);
const $dom = tree.render();
console.log(111, $dom);
```
![image.png](https://upload-images.jianshu.io/upload_images/3297464-3b8853d52dd83f2c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这跟vue的render方法很相似
```js
return h('div', {
        style: {
            background: '#fff',
        },
        class: {
            'content': true,
        },
        on: {
            click: () => {
                
            },
            mouseenter: () => {
                
            },
            mouseleave: () => {
                
            },
        },
    }, [
        h('p', {}, '文本')
    ])
```
vue中也是把template解析成render模板进行渲染的;
### 二: 比较新旧 DOM树的差异


### 差异类型

对DOM的操作也就是对节点的增删改查操作,当前定义了如下几种类型

```js
patch.NODE_DELETE = 'NODE_DELETE'; // 节点被删除
patch.NODE_TEXT_MODIFY = 'NODE_TEXT_MODIFY'; // 文本节点被更改
patch.NODE_REPLACE = 'NODE_REPLACE'; // 节点被替代
patch.NODE_ADD = 'NODE_ADD'; // 添加节点
patch.NODE_ATTRIBUTE_MODIFY = 'NODE_ATTRIBUTE_MODIFY'; // 更新属性
patch.NODE_ATTRIBUTE_ADD = 'NODE_ATTRIBUTE_ADD'; // 添加属性
patch.NODE_ATTRIBUTE_DELETE = 'NODE_ATTRIBUTE_DELETE'; // 删除属性

```

#### 深度优先遍历,记录差异

首先简单解释一下什么是深度优先遍历和广度优先遍历:

![dep.png](https://upload-images.jianshu.io/upload_images/3297464-e818c608d2752bef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 对于一颗二叉树，深度优先搜索(Depth First Search)是沿着树的深度遍历树的节点，尽可能深的搜索树的分支。以上面二叉树为例，深度优先搜索的顺序为：ABDECFG。怎么实现这个顺序呢 ？深度优先搜索二叉树是先访问根结点，然后遍历左子树接着是遍历右子树，因此我们可以利用堆栈的先进后出的特点，现将右子树压栈，再将左子树压栈，这样左子树就位于栈顶，可以保证结点的左子树先与右子树被遍历。

　　广度优先搜索(Breadth First Search),又叫宽度优先搜索或横向优先搜索，是从根结点开始沿着树的宽度搜索遍历，上面二叉树的遍历顺序为：ABCDEFG.

1.比较属性的变化

遍历旧的属性,找到被删除和修改的情况
- 新属性中不存在,旧属性存在,属性被删除
- 新旧属性中都存在,但是值不同: 属性值被修改
遍历新元素的属性,找到添加的属性


2.比较子元素的变化


3.比较innerHTML的变化


使用pathes 来存储差异

完整代码如下
diff.js

```js
import patch from './patch';
function diff(oldTree, newTree) {
    const patches = {};
    const index = {
        value: 0,
    }
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
}
// 比较属性的变化
function diffProps(oldProps, newProps, index, currentIndexPatches) {
    // 遍历旧的属性,找到被删除和修改的情况
    for (const propKey in oldProps) {
        // 新属性中不存在,旧属性存在,属性被删除
        if (!newProps.hasOwnProperty(propKey)) {
            currentIndexPatches.push({
                type: patch.NODE_ATTRIBUTE_DELETE,
                key: propKey,
            })
        } else if (newProps[propKey] !== oldProps[propKey]) {
            // 新旧属性中都存在,但是值不同: 属性被修改
            currentIndexPatches.push({
                type: patch.NODE_ATTRIBUTE_MODIFY,
                key: propKey,
                alue: newProps[propKey],
            })
        }
    }

    // 遍历新元素,找到添加的部分
    for (const propKey in newProps) {
        // 旧属性中不存在,新属性中存在: 添加属性
        if (!oldProps.hasOwnProperty(propKey)) {
            currentIndexPatches.push({
                type: patch.NODE_ATTRIBUTE_ADD,
                key: propKey,
                value: newProps[propKey]
            })
        }
    }
}
// 顺序比较子元素的变化
function diffChildren(oldChildren, newChildren, index, currentIndexPatches, patches) {
    const currentIndex = index.value;
    if (oldChildren.length < newChildren.length) {
        // 有元素被添加
        let i = 0;
        for (; i < oldChildren.length; i++) {
            
            index.value++;
            dfsWalk(oldChildren[i], newChildren[i], index, patches)
        }
        for (; i < newChildren.length; i++) {
            currentIndexPatches.push({
                type: patch.NODE_ADD,
                value: newChildren[i]
            })
        }
    } else {
        // 对比新旧子元素的变化
        for(let i = 0; i< oldChildren.length; i++) {
            index.value++;
            dfsWalk(oldChildren[i], newChildren[i], index, patches)
        }
    }
}
// 比较innerHTML的变化
function dfsWalk(oldNode, newNode, index, patches) {
    const currentIndex = index.value;
    const currentIndexPatches = [];
    if(newNode === undefined) {
        // 节点被移除
        currentIndexPatches.push({
            type: patch.NODE_DELETE,
        })
    } else if(typeof oldNode === 'string' && typeof newNode === 'string') {
        // 文本节点被修改
        if(oldNode !== newNode) {
            currentIndexPatches.push({
                type: patch.NODE_TEXT_MODIFY,
                value: newNode,
            })
        }
    } else if(oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
        // 同时根据tagName和key来进行对比
        diffProps(oldNode.props, newNode.props, index, currentIndexPatches);
        diffChildren(oldNode.children, newNode.children, index, currentIndexPatches, patches);
    } else {
        currentIndexPatches.push({
            type: patch.NODE_REPLACE,
            value: newNode,
        })
    }
    if(currentIndexPatches.length > 0) {
        patches[currentIndex] = currentIndexPatches;
    }
}

export default diff;
```
需要注意的是，因为tagName是重复的，不能用这个进行对比，所以需要给子节点加上唯一的标识key,列表对比的时候，使用key进行对比，这样才能复用老的DOM树上的节点;

为了实现深度优先遍历,记录差异，这里使用列表计算法

求最小的插入,删除操作的组合；这个问题抽象出来其实是字符串的最小编辑距离问题（[Edition Distance](https://en.wikipedia.org/wiki/Edit_distance)），最常见的解决算法是 [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance)，通过动态规划求解。我们需要优化一下最常见的操作；具体的实现算法也很多；


> 当前实现的简单 Virtual DOM, 并没有实现如果是数组,会优先使用key去做对比; 下面大致从Vue虚拟DOM的Diff算法实现的角度去解释一下之前的一篇文章[为什么使用v-for时必须添加唯一的key?](http://wangyaxing.top/2018/03/18/2018-03-18-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8v-for%E6%97%B6%E5%BF%85%E9%A1%BB%E6%B7%BB%E5%8A%A0%E5%94%AF%E4%B8%80%E7%9A%84key/)

vue和react的虚拟DOM的Diff算法大致相同，其核心是基于两个简单的假设：

1. 两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构。
2. 同一层级的一组节点，他们可以通过唯一的id进行区分。基于以上这两点假设，使得虚拟DOM的Diff算法的复杂度从O(n^3)降到了O(n)。

引用[React’s diff algorithm](https://calendar.perfplanet.com/2013/diff/ "Permanent Link to React’s diff algorithm")中的例子:

![diff1.jpg](https://upload-images.jianshu.io/upload_images/3297464-0848720c71af2123.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
当某一层有很多相同的节点时，也就是列表节点时，Diff算法的更新过程默认情况下也是遵循以上原则。
比如一下这个情况：
![diff2.jpg](https://upload-images.jianshu.io/upload_images/3297464-ee627869a6714336.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
我们希望可以在B和C之间加一个F，Diff算法默认执行起来是这样的：
![diff3.jpg](https://upload-images.jianshu.io/upload_images/3297464-d912523aac5fd108.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
即把C更新成F，D更新成C，E更新成D，最后再插入E，是不是很没有效率？

所以我们需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。
![diff4.jpg](https://upload-images.jianshu.io/upload_images/3297464-650689b4bd4b9eb6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

所以一句话，key的作用主要是为了高效的更新虚拟DOM。另外vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。



###  三：将差异的部分渲染到DOM树即只渲染变化了的部分

通过深度优先遍历，记录差异 patches,最后需要根据patches进行DOM操作;
paches记录了差异的类型;大致数据结构如下:

![image.png](https://upload-images.jianshu.io/upload_images/3297464-748c6919f1e69663.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

实现该过程的完整代码如下:

patch.js
```js
function patch($dom, patches) {
    const index = {
        value: 0,
    }
    dfsWalk($dom, index, patches);
}
patch.NODE_DELETE = 'NODE_DELETE'; // 节点被删除
patch.NODE_TEXT_MODIFY = 'NODE_TEXT_MODIFY'; // 文本节点被更改
patch.NODE_REPLACE = 'NODE_REPLACE'; // 节点被替代
patch.NODE_ADD = 'NODE_ADD'; // 添加节点
patch.NODE_ATTRIBUTE_MODIFY = 'NODE_ATTRIBUTE_MODIFY'; // 更新属性
patch.NODE_ATTRIBUTE_ADD = 'NODE_ATTRIBUTE_ADD'; // 添加属性
patch.NODE_ATTRIBUTE_DELETE = 'NODE_ATTRIBUTE_DELETE'; // 删除属性

// 根据不同类型的差异对当前节点进行 DOM 操作：
function dfsWalk($node, index, patches, isEnd = false) {
    if (patches[index.value]) {
        patches[index.value].forEach(p => {
            switch (p.type) {
                case patch.NODE_ATTRIBUTE_MODIFY:
                    {
                        $node.setAttribute(p.key, p.value);
                        break;
                    }
                case patch.NODE_ATTRIBUTE_DELETE:
                    {
                        $node.removeAttribute(p.key, p.value);
                        break;
                    }
                case patch.NODE_ATTRIBUTE_ADD:
                    {
                        $node.setAttribute(p.key, p.value);
                        break;
                    }
                case patch.NODE_ADD:
                    {
                        $node.appendChild(p.value.render());
                        break;
                    }
                case patch.NODE_TEXT_MODIFY:
                    {
                        $node.textContent = p.value;
                        break;
                    }
                case patch.NODE_REPLACE:
                    {
                        $node.replaceWith(p.value.render());
                        break;
                    }
                case patch.NODE_DELETE:
                    {
                        $node.remove();
                        break;
                    }
                default:
                    {
                        console.log(p);
                    }

            }

        });
    }
    if (isEnd) {
        return;
    }
    if ($node.children.length > 0) {
        for (let i = 0; i < $node.children.length; i++) {
            index.value++;
            dfsWalk($node.children[i], index, patches);
        }
    } else {
        index.value++;
        dfsWalk($node, index, patches, true);
    }
};

export default patch;

```

## 最后测试一下

```js

// 1.构建虚拟DOM
const tree = new Element('div', {classname: 'div'}, [
    new Element('h1', {style: 'color: red;'},['Hello, This is my Vdom library']),
    new Element('ul', [
        new Element('li', ['1111']),
        new Element('li', ['2222']),
    ])
]);
// 2.通过虚拟DOM构建真正的DOM
const $dom = tree.render();
const $app = document.querySelector('#app');
$app.replaceWith($dom);
// 3.生成新的虚拟DOM
const newTree = new Element('div', {id: 'div1'}, [
    new Element('h1', {style: 'color: red;'}, ['Hello, This is my vdom library111']),
    new Element('p', {style: 'color: blue;'}, ['extra text']),
    new Element('ul', [
        new Element('li', ['1111']),
        new Element('li', ['5555']),
        new Element('li', ['333']),
    ])
]);
// 4.比较新旧虚拟DOM树的差异
const patches = diff(tree, newTree);
// 5.根据变化了的部分去更新DOM
patch($dom, patches);
```
## 总结
关键的几个文件就是： [element.js](https://github.com/funnycoderstar/simple-virtual-dom/blob/master/lib/element.js), [diff.js](https://github.com/funnycoderstar/simple-virtual-dom/blob/master/lib/diff.js), [patch.js](https://github.com/funnycoderstar/simple-virtual-dom/blob/master/lib/patch.js);
github上有很多Virtual DOM实现的例子，博主也是参考了一下其他人的实现，感兴趣的可以去搜索看一下，或者自己实现一个
## 参考
- [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)
- [Vue2.0 v-for 中 :key 到底有什么用？](https://www.zhihu.com/question/61064119/answer/183717717)
- [React’s diff algorithm](https://calendar.perfplanet.com/2013/diff/ "Permanent Link to React’s diff algorithm")












