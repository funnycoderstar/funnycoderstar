---
title: css实现toolTip
date: 2017-09-27 10:58:59
tags: [css]
categories: css
type: "css"
---
![title](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506491736485&di=c04a08b7627d2a6733d9ffdb1c1c8df3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F16%2F04%2F82%2F00F58PIC8Ny_1024.jpg)
<!--more-->
### 1,常用border来实现三角形
> 原理: 宽高都不设置(即为0),只设置边框,如果4个边框都设置宽度(border-width),样式(border-style)和颜色(border-color)
```
.test {
    width:0;
    height: 0;
    border-top: 100px solid red ;
    border-bottom: 100px solid blue;
    border-left: 100px solid green;
    border-right: 100px solid yellow;
}
```
效果如图
![](http://oo4xdz5i0.bkt.clouddn.com/border.jpg)

上面看到的都是三角形,其实想实现单个三角形只需把其他三个三角形的`border-color`设置为透明色就可以了
这样就实现了三角形
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>各种三角形</title>
    <style>
     * {
         margin: 0;
         padding: 0;
         list-style: none;
     }
     li {
         margin-top: 50px;
     }
     .triangle-up {
        width: 0;
        height: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 100px solid red;
    }
    .triangle-down {
        width: 0;
        height: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-top: 100px solid red;
    }
    .triangle-left {
        width: 0;
        height: 0;
        border-top: 50px solid transparent;
        border-right: 100px solid red;
        border-bottom: 50px solid transparent;
    }
    .triangle-right {
        width: 0;
        height: 0;
        border-top: 50px solid transparent;
        border-left: 100px solid red;
        border-bottom: 50px solid transparent;
    }
    .triangle-topleft {
        width: 0;
        height: 0;
        border-top: 100px solid red;
        border-right: 100px solid transparent;
    }
    .triangle-topright {
        width: 0;
        height: 0;
        border-top: 100px solid red;
        border-left: 100px solid transparent; 
    }
    .triangle-bottomleft {
        width: 0;
        height: 0;
        border-bottom: 100px solid red;
        border-right: 100px solid transparent;
    }
    .triangle-bottomright {
        width: 0;
        height: 0;
        border-bottom: 100px solid red;
        border-left: 100px solid transparent;
    }

    </style>
</head>
<body>
    <ul>
        <li class="triangle-up"></li>
        <li class="triangle-down"></li>
        <li class="triangle-left"></li>
        <li class="triangle-right"></li>
        <li class="triangle-topleft"></li>
        <li class="triangle-topright"></li>
        <li class="triangle-bottomleft"></li>
        <li class="triangle-bottomright"></li>
    </ul>
</body>
</html>

```
### 2,css实现toolTip(实心三角箭头)
原理: 
- 一个三角形绝对定位到主体元素边界处并连接起来
- 把三角形的颜色换成和主体元素一致的背景色就可以
```css
.test {
    position: relative;
    width: 300px;
    height: 100px;
    border-radius: 20px;
    margin: 100px auto;
    background-color: #A5C4EC;
}
.test:before{
    content: '';
    display: block;
    position: absolute;
    bottom: -20px;
    left: 80px;
    border-left: 20px solid transparent ;
    border-right: 20px solid transparent;
    border-top: 20px solid #A5C4EC;
}
```
![](http://oo4xdz5i0.bkt.clouddn.com/border-arrow.jpg)

### 3,css实现toolTip(空心三角箭头)源码如下
原理:
- 一个边框颜色的三角形绝对定位到主体元素边界处并连接起来
- 另一个主体元素背景色的三角形绝对定位并覆盖到第一个三角形上面
- 第二个三角形相较于第一个三角形定位上偏移距离应等于边框厚度
```css
.test {
    position: relative;
    width: 300px;
    height: 100px;
    border-radius: 20px;
    margin: 100px auto;
    border: 6px solid blue;
    background-color: #A5C4EC;
}
.test:before{
    content: '';
    display: block;
    position: absolute;
    bottom: -20px;
    left: 80px;
    border-left: 20px solid transparent ;
    border-right: 20px solid transparent;
    border-top: 20px solid blue;
}
.test:after{
    content: '';
    display: block;
    position: absolute;
    bottom: -14px;
    left: 80px;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid #fff;
}
```
![title](http://oo4xdz5i0.bkt.clouddn.com/border1.jpg)
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .wrap {
            width: 1000px;
            margin: 0 auto;
        }
        /* 向下 */
        .toolTip-bottom {
            position: relative;
            width: 300px;
            height: 100px;
            border: 1px solid #A5C4EC;
            border-radius: 20px;
            margin: 100px auto;
            background-color: #fff;
         }
        .toolTip-bottom:before{
            content: '';
            display: block;
            position: absolute;
            bottom: -20px;
            left: 80px;
            border-left: 20px solid transparent ;
            border-right: 20px solid transparent;
            border-top: 20px solid #A5C4EC;
        }

        .toolTip-bottom:after{
            content: '';
            display: block;
            position: absolute;
            bottom: -17.6px;
            left: 80px;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 20px solid #fff;
        }
          /* 向上 */
          .toolTip-top {
            position: relative;
            width: 300px;
            height: 100px;
            border: 1px solid #A5C4EC;
            border-radius: 20px;
            margin: 100px auto;
            background-color: #fff;
         }
        .toolTip-top:before{
            content: '';
            display: block;
            position: absolute;
            top: -20px;
            left: 80px;
            border-left: 20px solid transparent ;
            border-right: 20px solid transparent;
            border-bottom: 20px solid #A5C4EC;
        }

        .toolTip-top:after{
            content: '';
            display: block;
            position: absolute;
            top: -17.6px;
            left: 80px;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-bottom: 20px solid #fff;
        }
        /* 向左 */
        .toolTip-left {
            position: relative;
            width: 300px;
            height: 100px;
            border: 1px solid #A5C4EC;
            border-radius: 20px;
            margin: 100px auto;
            background-color: #fff;
        }
        .toolTip-left:before {
            content: '';
            display: block;
            position: absolute;
            left: -20px;
            top: 30px;
            border-top: 20px solid transparent ;
            border-bottom: 20px solid transparent;
            border-right: 20px solid #A5C4EC;
        }
        .toolTip-left:after {
            content: '';
            display: block;
            position: absolute;
            left: -18px;
            top: 30px;
            border-top: 20px solid transparent ;
            border-bottom: 20px solid transparent;
            border-right: 20px solid #fff;
        }

        /* 向右 */
        .toolTip-right {
            position: relative;
            width: 300px;
            height: 100px;
            border: 1px solid #A5C4EC;
            border-radius: 20px;
            margin: 100px auto;
            background-color: #fff;
        }
        .toolTip-right:before {
            content: '';
            display: block;
            position: absolute;
            right: -20px;
            top: 40px;
            border-top: 20px solid transparent ;
            border-bottom: 20px solid transparent;
            border-left: 20px solid #A5C4EC;
        }
        .toolTip-right:after {
            content: '';
            display: block;
            position: absolute;
            right: -18px;
            top: 40px;
            border-top: 20px solid transparent ;
            border-bottom: 20px solid transparent;
            border-left: 20px solid #fff;
        }

    </style>
</head>

<body>
    <div class="wrap">
        <div class="toolTip-bottom"></div>
        <div class="toolTip-top"></div>
        <div class="toolTip-left"></div>
        <div class="toolTip-right"></div>
    </div>
</body>

</html>
```
### 效果图如下
![效果图](http://oo4xdz5i0.bkt.clouddn.com/toolTip.png)

[参考](https://juejin.im/post/59c9e9276fb9a00a616f4842)

[aboutme](http://wangyaxing.deercv.com/)
[github](https://github.com/funnycoderstar)
[blog](http://wangyaxing.top/2017/09/27/css%E5%AE%9E%E7%8E%B0toolTip/#more)
