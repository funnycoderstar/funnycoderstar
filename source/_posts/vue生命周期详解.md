---
title: vue生命周期详解
date: 2017-08-29 18:48:59
tags: vue
type: "tags"
categories: vue
---
![title](http://upload-images.jianshu.io/upload_images/1541368-d9be1b3b39abc037?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
vue声明周期,在每个声明周期中都干了些什么?
<!--more-->
#### 1, vue的生命周期
- beforeCreate: 组件实例刚刚被创建,组件属性计算之前,如data属性
- created: 组件实例创建完成,属性已绑定,但是DOM还未完成,$el属性还不存在
- beforeMount:模板编译/挂载之前
- mounted: 模板编译/挂载之后
- beforeUpdate: 组件更新之前
- updated: 组件更新之后
- activated: for `keep-alive`,组件被激活时调用
- deactivated: for `keep-alive`,组件被移除时调用
- beforeDestroy: 组件销毁前被调用
- destoryed: 组件销毁后调用
> ps:下面代码可以直接复制出去执行
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<script type="text/javascript" src="https://cdn.jsdelivr.net/vue/2.1.3/vue.js"></script>
<body>
    <div id="app">{{a}}</div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                a: 'vuejs',
            },
            beforeCreate: function() {
                console.log('创建前');
                console.log(this.a);
                console.log(this.$el);
            },
            created: function() {
                console.log('创建之后');
                console.log(this.a);
                console.log(this.$el);
            },
            beforeMount: function() {
                console.log('mount之前');
                console.log(this.a);
                console.log(this.$el);
            },
            mounted: function() {
                console.log('mount之后');
                console.log(this.a);
                console.log(this.$el);
            },
            beforeUpdate: function() {
                console.log('更新之前');
                console.log(this.a);
                console.log(this.$el);
            },
            updated: function() {
                console.log('更新完成');
                console.log(this.a);
                console.log(this.$el);
            },
            beforeDestroy: function() {
                console.log('组件销毁之前');
                console.log(this.a);
                console.log(this.$el);
            },
            destroyed: function() {
                console.log('组件销毁之后');
                console.log(this.a);
                console.log(this.$el);
            },
        })
    </script>
</body>
</html>
```
> beforeCreated: el和data并未初始化
created: 完成data数据的初始化,el没有
beforeMount: 完成了el和data初始化
mounted: 完成挂载
![title](http://oo4xdz5i0.bkt.clouddn.com/vueLife.png)
```
vm.a = 'change';
```
![title](http://oo4xdz5i0.bkt.clouddn.com/vueUpdate.png)

> `activated`和`deactivated`这两个生命周期函数涉及到`<keep-alive>`这个组件,所以想了解这个生命周期函数的可以看一下我的[另一篇文章](http://wangyaxing.top/2017/08/29/vue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%AF%A6%E8%A7%A3/#more)
