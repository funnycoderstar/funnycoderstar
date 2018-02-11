---
title: vue全家桶+crawler+koa2 实现阴阳师小助手
date: 2017-05-20 17:26:46
tags: vue
type: "tags"
categories: vue
---
![title](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502713315793&di=f4c278533dc65215060e4dd216b01a20&imgtype=0&src=http%3A%2F%2Fupload.chinaz.com%2F2016%2F0928%2F6361065295044373028726125.png)
最近一直在玩阴阳师，看了好多小助手，觉得太复杂了，还得登录什么的，想着自己写一个简单的小助手，只要输入要搜索的式神，我想知道的关于这个式神的数据就能显示出来。
只是第一版，前端用vue全家桶实现的，很适合刚开始接触vue的，后端用node实现的，如果有更好的建议或者想一起合作写个更好用点的，欢迎联系 [作者](https://github.com/funnycoderstar/yys-fe)。
<!-- more -->

# yys-fe(阴阳师小助手前端)

> A Vue.js project

### [github](https://github.com/funnycoderstar/yys-fe)

### [项目链接](http://yys.wangyaxing.top/#/)

![](http://upload-images.jianshu.io/upload_images/3297464-bcc37825a913c8ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### [阴阳师小助手后端实现](https://github.com/funnycoderstar/yys-be)
- nodejs + crawler + koa2 + mongoose

## 效果图


![search.png](http://upload-images.jianshu.io/upload_images/3297464-7c42da95d346c282.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![searchResult.png](http://upload-images.jianshu.io/upload_images/3297464-3e76f027626a4124.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![heroList.png](http://upload-images.jianshu.io/upload_images/3297464-c776e7602061a23a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![heroTab.png](http://upload-images.jianshu.io/upload_images/3297464-c266c0669e263d00.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




## 基本
    - 构建工具：webpack；
    - 语言：Es6；
    - 代码规范：eslint
    - 应用：vue，
         vuex（数据管理架构），
         vue-router（路由），
         mint-ui（ul组件），
         vue-axios（vue做的ajax请求）

## 目录结构

```
|-- [build]                          //构建服务和webpack配置
|-- [config]                        //项目不同环境的配置
|-- [dist]                            //文件服务器根目录  
|-- [node_modules]          //项目依赖
|-- [src]                             //源码
|   |-- [assets]                    //资源文件
|   |-- [components]           //项目模块文件夹
|   |-- [store]                      //存储数据
|   |       |-- index.js            //vuex store 定义
|   |-- App.vue                   //主页面   
|   |-- main.js                     //webpack预编译入口
|   |-- [router]                     //全局路由定义
|-- .babelrc                       //babel配置
|-- .eslintrc.js                    //eslint rule 定义
|-- index.html                    //项目入口文件
|-- package.json               //项目配置文件
|-- README.md               //关于启动项目的命令和含义

```
## 已经完成的模块

- [x] 式神搜索页面(支持模糊搜索)
- [x] 式神搜索结果页面
- [x] 式神列表页面
- [x] 式神详细信息页面
- [X] 推荐御魂
- [X] 推荐搭配
- [X] 式神点评

## 待完成与优化

- [ ] 搜索功能添加历史搜索和热门搜索
- [ ] 式神攻略
- [ ] 式神视频
- [ ] 页面样式的优化

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

关于用vue时遇到的坑，记录在我的[博客](https://github.com/funnycoderstar/blog/issues?utf8=%E2%9C%93&q=vue),希望可以对大家有用
目前小编在学react，所以用[react也写了一版](https://github.com/funnycoderstar/yys_v2),所以刚开始接触react的童鞋也可以看一下，想着第二版的ui设计的好看一点儿，功能再多一点儿，期待更多的建议。

## About
[aboutme](http://wangyaxing.deercv.com/)
[github](https://github.com/funnycoderstar)
[blog](https://github.com/funnycoderstar/blog)
