---
title: rem
date: 2017-12-06 23:13:52
tags:
---
rem(font size of the root element)是指相对于根元素(<html>)的字体大小的单位;em(font size of the element)是指相对于父元素的字体大小单位;它们之前的区别是计算规则一个是依赖根元素一个依赖父元素

1,实现强大的屏幕适配布局

流式布局: 使用百分比来定义宽度,但是高度大都是用px来固定,所以在打屏幕的手机下显示显示会变成有些页面元素宽度被拉的很长,但是高度还是和原来一样

固定宽度:有些网站把页面设置成320的宽度，超出部分留白;例如在大屏幕手机下两边是留白的，还有一个就是大屏幕手机下看起来页面会特别小，操作的按钮也很小;

响应式布局: 国内很少有大型企业的复杂性网站在移动端用这种方法来做,主要原因是工作量大,维护性难;一般都是中小型的门户或者博客类站点会采用响应式的方法从web page 到web app直接一步到位.

设置viewport进行缩放:
```js
<meta name="viewport" content="width=320,maximum-scale=1.3,user-scalable=no">
```

2,rem能等比例适配所有屏幕
rem是通过根元素进行适配的,网页中的根元素指的是html我们通过设置html的字体大小就可以控制rem的大小
```
html{
    font-size:20px;
}
.btn {
    width: 6rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
    display: inline-block;
    background: #06c;
    color: #fff;
    border-radius: .5rem;
    text-decoration: none;
    text-align: center;    
}

```
120px = 6rem * 20px(跟元素设置的值)

代码原理
这是阿里团队的高清方案布局代码，所谓高清方案就是根据设备屏幕的DPR（设备像素比，又称DPPX，比如dpr=2时，表示1个CSS像素由4个物理像素点组成） 

动态设置 html 的font-size, 同时根据设备DPR调整页面的缩放值，进而达到高清效果。

有何优势
引用简单，布局简便
根据设备屏幕的DPR,自动设置最合适的高清缩放。
保证了不同设备下视觉体验的一致性。（老方案是，屏幕越大元素越大；此方案是，屏幕越大，看的越多）
有效解决移动端真实1px问题（这里的1px 是设备屏幕上的物理像素）

简单的理解rem实现
设计稿的1080px , 10rem, 10rem * 108

屏幕宽度: 375 
跟节点: 37.5
设计稿: 1080px
div.width=1080=10rem=1080/baseValue
baseValue: 108
10rem * 37.5 = 375

屏幕宽度/font-size=10rem=设计稿/baseValue 
baseValue = 设计稿/10

border: 1px 问题
使用viewport设置缩放比例来解决

物理像素: 一个物理像素是显示器(手机屏幕)上最小的物理显示单元,
设备独立像素:也叫密度无关像素,可以认为是计算机坐标系统中得一个点,这个点代表一个可以由程序使用的虚拟像素(比如: css像素),然后由相关系统转为物理像素
设备像素比: 设备像素/设备独立像素

js中,可以通过window.devicePixelRatio获取当前设备的dpr
css中可以通过

iphone6
1.设备宽高375*667,可以理解为设备独立像素
2.dpr为2,根据上面计算公式,物理像素就应该为*2,750*1334

在普通屏幕下，1个css像素 对应 1个物理像素(1:1)。
在retina 屏幕下，1个css像素对应 4个物理像素(1:4)。


## 参考
[rem是如何实现自适应布局的？](http://caibaojian.com/web-app-rem.html)
http://www.cnblogs.com/axl234/p/5156956.html