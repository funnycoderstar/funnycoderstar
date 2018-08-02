---
title: vue中需要注意的问题总结(上)
date: 2018-04-15 15:30:54
type: "tags"
categories: vue
---
![title](http://upload-images.jianshu.io/upload_images/1541368-d9be1b3b39abc037?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<!--more-->

> 记录使用vue中遇到的一些问题(一)

使用vue的时候经常会遇到一些问题,为了深入的理解官方文档中对这些问题的解释,查阅了一些资料,再加上自己的理解,整理了一些常见的问题;如果哪方面解释的不太合理希望各路大神指出;

## [methods && computed && watch的区别](https://segmentfault.com/a/1190000010280212)

计算属性有`缓存`,取决于它所依赖的那个值是否发生变化;在methods中定义方法,每次都会进行重新计算;

## data必须是一个函数
如果把data也定义为一个对象,它有两个实例component1和component2, 同一个属性a, 在component1中进行修改,发现component2中的a也被修改了;

详解见另一篇文章[为什么vue中data必须是一个函数](http://wangyaxing.cn/2018/03/13/2018-03-13-%E4%B8%BA%E4%BB%80%E4%B9%88vue%E4%B8%ADdata%E5%BF%85%E9%A1%BB%E6%98%AF%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0/#more)

## vue中检测不到数组/对象的变化

详解见另一篇文章[vue中检测不到数组变化的解决方案](http://wangyaxing.cn/2018/01/17/2018-01-17-vue%E4%B8%AD%E6%A3%80%E6%B5%8B%E4%B8%8D%E5%88%B0%E6%95%B0%E7%BB%84%E5%8F%98%E5%8C%96%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/#more)

## 为什么使用`v-for`时必须添加`key`,且`key`必须是唯一的

详解见另一篇文章[vue中检测不到数组变化的解决方案](http://wangyaxing.cn/2018/03/18/2018-03-18-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8v-for%E6%97%B6%E5%BF%85%E9%A1%BB%E6%B7%BB%E5%8A%A0%E5%94%AF%E4%B8%80%E7%9A%84key/#more)

## vue生命周期详解

详解见另一篇文章[vue生命周期详解](http://wangyaxing.cn/2017/08/29/2017-08-29-vue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%AF%A6%E8%A7%A3/)

## vue组件通信

详解见另一篇文章[vue组件通信](http://wangyaxing.cn/2017/08/29/2017-08-29-vue%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1/)

## vue组件之keep-alive
详解见另一篇文章[用vue,你知道 keep-alive 么](http://wangyaxing.cn/2017/09/06/2017-09-06-vue%E7%BB%84%E4%BB%B6%E4%B9%8Bkeep-alive/)


## vue的计算属性computed默认只有getter,需要使用getter的时候需要自己加一个setter

举例
vue.js计算属性默认只有 getter，因为是默认值所以我们也常常省略不写，如下代码：
```js
export default {
    data () {
        return {
            a: '测试'
        };
    },
    computed: {
        b () {
            return `计算属性${this.a}`;
        },
    },
    methods: {
        changeB () {
            this.b = '123';
        }
    },
};
```
其中computed里的代码完整写法是  
```js
 computed: {
        b: {
            get() {
                return `计算属性${this.a}`;
            }
        },
    },
```
执行 changeB 发现报错`[Vue warn]: Computed property "b" was assigned to but it has no setter.`

我们需要给计算属性b添加一个setter

```js
computed: {
        b: {
            get() {
                return `计算属性${this.a}`;
            },
            set(newVal) {
                console.log('值被更新');
            },
        },
    },
```

```js

```

## methods/watch里面不应该使用箭头函数, 使用箭头函数时this指向是不一定的;

官方文档中特别提醒中已经指出这一点:

所有的生命周期钩子自动绑定 this 上下文到实例中，因此你可以访问数据，对属性和方法进行运算。这意味着 你不能使用箭头函数来定义一个生命周期方法 (例如 created: () => this.fetchTodos())。这是因为箭头函数绑定了父上下文，因此 this 与你期待的 Vue 实例不同，this.fetchTodos 的行为未定义。




