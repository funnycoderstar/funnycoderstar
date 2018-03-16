---
title: calendar
tags: vue
---
> 记录使用vue中遇到的一些问题
## [methods计算属性watch的区别](https://segmentfault.com/a/1190000010280212)

计算属性有`缓存`,取决于它所依赖的那个值是否发生变化;在methods中定义方法,每次都会进行重新计算;

## data必须是一个函数
如果把data也定义为一个对象,它有两个实例component1和component2, 同一个属性a, 在component1中进行修改,发现component2中的a也被修改了;

详解见另一篇文章[为什么vue中data必须是一个函数]()

## vue中检测不到数组/对象的变化

详解见另一篇文章[vue中检测不到数组变化的解决方案]()

## 为什么使用`v-for`时必须添加`key`,且`key`必须是唯一的

使用`v-for`更新已渲染的元素列表时,默认用`就地复用`策略;列表数据修改的时候,他会根据key值去判断某个值是否修改,如果修改,则重新渲染这一项,否则复用之前的元素;
我们在使用的使用经常会使用`index`(即数组的下标)来作为`key`,但其实这是不推荐的一种使用方法;



```js
const list = [
    {
        id: 1,
        name: 'test1',
    },
    {
        id: 2,
        name: 'test2',
    },
    {
        id: 3,
        name: 'test3',
    },
]
```
```js
<div v-for="(item, index) in list" :key="index" >{{item.name}}</div>
```
上面这种是我们做项目中常用到的一种场景,因为不加key,vue现在直接报错,所以我使用index作为key;下面列举两种种常见的数据更新情况

1.在最后一条数据后再加一条数据

```js
const list = [
    {
        id: 1,
        name: 'test1',
    },
    {
        id: 2,
        name: 'test2',
    },
    {
        id: 3,
        name: 'test3',
    },
    {
        id: 4,
        name: '我是在最后添加的一条数据',
    },
]
```
此时前三条数据直接复用之前的,新渲染最后一条数据,此时用`index`作为`key`,没有任何问题;

2.在中间插入一条数据
```js
const list = [
    {
        id: 1,
        name: 'test1',
    },
    {
        id: 4,
        name: '我是插队的那条数据',
    }
    {
        id: 2,
        name: 'test2',
    },
    {
        id: 3,
        name: 'test3',
    },
]
```
此时更新渲染数据,通过`index`定义的`key`去进行前后数据的对比,发现


```js
之前的数据                         之后的数据

key: 0  index: 0 name: test1     key: 0  index: 0 name: test1
key: 1  index: 1 name: test2     key: 1  index: 1 name: 我是插队的那条数据
key: 2  index: 2 name: test3     key: 2  index: 2 name: test2
                                 key: 3  index: 3 name: test3
```
通过上面清晰的对比,发现除了第一个数据可以复用之前的之外,另外三条数据都需要重新渲染;

是不是很惊奇,我明明只是插入了一条数据,怎么三条数据都要重新渲染?而我想要的只是新增的那一条数据新渲染出来就行了

最好的办法是使用数组中不会变化的那一项作为`key`值,对应到项目中,即每条数据都有一个唯一的`id`,来标识这条数据的唯一性;使用`id`作为`key`值,我们再来对比一下向中间插入一条数据,此时会怎么去渲染


```js
之前的数据                         之后的数据

key: 1  id: 1 index: 0 name: test1     key: 1  id: 1 index: 0  name: test1
key: 2  id: 2 index: 1 name: test2     key: 4  id: 4 index: 1  name: 我是插队的那条数据
key: 3  id: 3 index: 2 name: test3     key: 2  id: 2 index: 2  name: test2
                                       key: 3  id: 3 index: 3  name: test3
```
现在对比发现只有一条数据变化了,就是`id`为4的那条数据,因此只要新渲染这一条数据就可以了,其他都是就复用之前的;