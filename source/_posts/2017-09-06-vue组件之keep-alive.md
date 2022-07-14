---
title: 用vue,你知道 keep-alive 么
date: 2017-09-06 17:26:46
tags: vue
type: 'tags'
categories: vue
---

![title](https://cdn.ionestar.cn/keep-alive.jpg)

<!--more-->

项目中写 vue 也没注意到`<keep-alive></keep-alive>`这个组件,最近在深入的研究 vue 组件的生命周期函数,每一个函数都是干嘛的,然后其中有`activated`和`deactivated`这两个函数与`<keep-alive></keep-alive>`这个组件有关

-   `activated`: keep-alive 组件激活时调用
-   `deactivated`: keep-alive 组件停用时调用

### [keep-alive 用法](https://cn.vuejs.org/v2/api/?#keep-alive)

-   `<keep-alive>`包裹动态组件时,会缓存不活动的组件实例,而不是销毁它们
-   `<keep-alive>`是一个抽象组件:它自身不会渲染一个 DOM 元素,也不会出现在父组件链中
-   当组件在`<keep-alive>`内被切换,它的`activated`和`deactivated`这两个生命周期钩子函数将会被对应执行

### 具体的实例如下

-   是一个简单的 tab 切换,可以尝试把`<keep-alive>`去掉之后,对比一下,然后就会发现它的好处

test.vue

```js
<template>
    <div class="test">
        <div class="testNav">
            <div :class="{'selected':tab === 1,'testTitle':true}" @click="toTab(1)">标题一</div>
            <div :class="{'selected':tab === 2,'testTitle':true}"  @click="toTab(2)">标题二</div>
        </div>
        <div class="container">
            <keep-alive>
                <Test1 v-if="tab === 1">
                </Test1>
                <Test2 v-else>
                </Test2>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import Test1 from './test1.vue';
    import Test2 from './test2.vue';
    export default {
        data() {
            return {
                tab: 1,
            };
        },
        components: {
            Test1,
            Test2,
        },
        methods: {
            toTab(index) {
                this.tab = index;
            },
        },
    }
</script>

<style lang="less">
.test {
    width: 100%;
    .testNav {
        height: 60px;
        line-height: 60px;
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        .testTitle {
            flex: 1;
            text-align: center;
        }
        .selected {
            color: red;
        }
    }
}
</style>
```

测试结果如下:
注意看一下页面和控制台输出的信息,可以更加直观的注意到`<keep-alive>`的作用及`activated`和`deactivated`这两个函数什么时候会被触发

-   打开页面,会出现下面这样
    ![1](https://cdn.ionestar.cn/keep-alive1.png)

用 setTimeout 模拟请求后端接口的场景

-   点击`title2`,出现下面的情况
    ![2](https://cdn.ionestar.cn/keep-alive2.png)
-   再次点击`title1`,出现下面的情况,你会发现从后端请求的数据会快速显示出来,但是如果你此时不用,会重新请求数据,你可以尝试一下
    ![3](https://cdn.ionestar.cn/keep-alive3.png)

> `test1.vue`和`test2.vue`的相关代码如下:

test1.vue

```js
<template>
  <div class="test1">
      test1
      {{testInfo1}}
  </div>
</template>

<script>
    export default {
        data() {
            return {
                testInfo1: '',
            };
        },
        activated() {
            console.log('测试1被激活');
        },
        deactivated() {
            console.log('测试1被缓存');
        },
        created() {
            setTimeout(() => {
                this.testInfo1 = '这是测试一的数据';
            }, 2000);
        },
    }
</script>

```

test2.vue

```js
<template>
  <div>
      test2
      {{testInfo2}}
  </div>
</template>

<script>
    export default {
        data() {
            return {
                testInfo2: '',
            }
        },
        activated() {
            console.log('测试2被激活');
        },
        deactivated() {
            console.log('测试2被缓存');
        },
        created() {
            setTimeout(() => {
                this.testInfo2 = '这是测试二的数据';
            }, 2000);
        },
    }
</script>
```
