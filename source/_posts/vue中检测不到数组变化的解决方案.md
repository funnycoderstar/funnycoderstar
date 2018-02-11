---
title: vue中检测不到数组变化的解决方案
date: 2018-01-17 19:55:08
tags: vue
type: "tags"
categories: vue
---
![title](http://upload-images.jianshu.io/upload_images/1541368-d9be1b3b39abc037?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

数组中当你利用索引设置一个项时,发现视图不发生变化

<!--more-->
### 场景:
最近做一个功能,要根据数组的index去修改对应项的`isSave`字段;

```js
data() {
    return {
        arr: [
            {
                name: '测试1',
                id: 1,
                isSave: false,
            },
            {
                name: '测试2',
                id: 2,
                isSave: false,
            },
        ],
    };
}
```
通过
```js
changeStatus(index) {
    this.arr[index].isSave = !this.arr[index].isSave;
}
```
最后视图并没有更新;

### 详解

查了一下官方文档关于列表渲染的注意事项[讲解](https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B);

由于javascript的限制,Vue不能检测一下变动的数组

1.当你利用索引设置一个项时, 例如: vm.items[indexOfItem] = newValue;
2.当你修改数组的长度时,例如: vm.items.length = newLength;

为了解决第一类问题,一下方式都可以实现和 vm.items[indexOfItem] = newValue相同的效果,同时也将触发状态更新;
```js
Vue.set(example1.item, indexOfItem, newValue);

```
```js
example1.items.splice(indexOfItem, 1, newValue);
```
为解决第二类问题,你可以使用splice:

```js
example1.items.splice(newLength)
```

### 解决方法

```js
changeStatus(index) {
    const obj = this.ticketWatcher.goodVos[index];
    obj.isSave = !obj.isSave;
    this.$set(this.ticketWatcher, index, obj);
}
  
```
### 参考文档

- [vue官网](https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)
- [vue数组中数据变化但是视图没有更新解决方案](http://blog.csdn.net/websoftware/article/details/73200957#reply)

