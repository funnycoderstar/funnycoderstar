---
title: 清除css默认样式的总结
date: 2017-09-06 13:46:12
tags: [css]
categories: css
type: "css"
---
![title](http://oo4xdz5i0.bkt.clouddn.com/css.jpg)
<!--more-->

我们写css的时候经常会遇到要清楚一些默认的样式,其实每次做项目中需要清除的样式就经常是那么几个,最常见的比如
- 清除表单元素`input`,`select`,``textarea`的默认样式,
- CSS3中隐藏滚动条但仍能继续滚动,
- 多行文本溢出省略号显示等等,
> 所以就总结了一下,持续更新中...,也请大家多多贡献更多的常见的需要清除默认样式的方法😊

#### 1,多行文本溢出省略号显示
- 让文本只显示一行，然后溢出省略号显示

```
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

```
- 让文本显示两行，然后溢出部分省略号显示
```
    line-height: 1.3rem;
    max-height: 2.6rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

```
#### 2，CSS3中隐藏滚动条但仍能继续滚动
```
::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}

```

#### 3, 解决iPhone中overflow:scroll;滑动速度慢或者卡的问题
```
-webkit-overflow-scrolling : touch;

```
#### 4,消除`input`,`textarea`等的默认样式
```js
input, button, select, textarea {
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
    border:0;
}
textarea{
    resize:none;
}

```
- `outline: none;`去掉chrome浏览器自带的点击input框出现边框情况
- `-webkit-appearance: button;`使元素标签看起来像个按钮样式,意思定义了按钮样式
  `-webkit-appearance: none;`去掉按钮样式
- `border-radius: 0;` 去掉圆角
  `border:0;` 去掉border
- `textarea{resize:none}`取消chrome下textarea可拖动放大：
## About
[aboutme](https://hacknical.com/resume/S1VKezRp-?locale=zh)
[github](https://github.com/funnycoderstar)
[blog](http://wangyaxing.top/)