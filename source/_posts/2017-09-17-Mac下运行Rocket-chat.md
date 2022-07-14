---
title: Mac下运行Rocket.chat
date: 2017-09-17 13:18:03
tags: [meteor, Rocket.chat]
categories: [meteor, Rocket.chat]
type: [meteor, Rocket.chat]
---

![title](https://cdn.ionestar.cn/rocketLogo.png-blogImg)

<!--more-->

### 1,简介

-   [github](https://github.com/RocketChat/Rocket.Chat)
-   Rocket.chat 是特性最丰富的 Slack 开源替代品之一
-   主要功能：群组聊天，直接通信，私聊群，桌面通知，媒体嵌入，文件上传，语音/视频聊天，截图等等
-   Rocket.chat 原生支持 windows,Mac OSX, Linux, ios 和 Android 平台

### 2，准备工作

由于 Rocket.chat 使用的是 Meteor 框架，而 Meteor 框架是对 Node.js 的封装，源码中又使用到了 CoffeeScript.js,使用数据库是 MongDB，所以在 Rocker.chat 上做二次开发，需要学习的技术有 Meteor, Node.js, CoffeeScript.js,MongDB；

#### 其他资料

-   [CoffeeScipt 中文网](http://coffee-script.org/)
-   [Meteor 中文网](http://zh.discovermeteor.com)

Rocket.chat 要运行，必须安装 Node.js,NPM,Meteor(包含了 Mongdb)
node 和 npm 的安装大家肯定特  别熟悉，下面说一下 meteor 的安装过程

#### 3,安装 meteor

```
curl https://install.meteor.com/ | sh
```

创建一个小工程的指令，

```bash
meteor create meteorApp
cd meteorApp
meteor

```

在浏览器中输入：http://localhost:3000/

#### 4,下载和运行 Rocket.chat

下载 Rocet.chat 最好使用 git 的命令

```
git clone git clone https://github.com/RocketChat/Rocket.Chat.git
```

等工程源码下载完毕后，进入对应的文件夹，然后运行

```
cd Rocket.Chat
npm start
```

> 在执行 npm start 的过程中，需要注意一下问题，否则可能会启动不了

-   1,运行会特别慢,建议加上修改源为淘宝源，具体方法如下[参考](http://blog.csdn.net/bugall/article/details/45765979)：

```
npm config set registry https://registry.npm.taobao.org
```

-   2,运行过程需要`翻墙`，因为国外的 npm 包在国内下载可能就被墙了

> 我在安装的过程中出现报错：
> ![](https://cdn.ionestar.cn/phantomjs-error.png)
> 找了 phantomjs[镜像](https://npm.taobao.org/mirrors/phantomjs)单独安装了一下速度很快，就成功了,😊,然后把 phantomjs 添加到环境变量(方法如下)

```
1,cd phantomjs
2,cd bin
3,pwd     //注: 需要输出的复制地址
4,cd ~    // 回到根目录
5,vim .zshrc
6,添加到path
7,source .zshrc // 保存修改
```

> ![phantomjst添加到Path.png](//upload-images.jianshu.io/upload_images/3297464-b97ab1ba31b426eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 运行成功命令行如下
> ![](https://cdn.ionestar.cn/rocketChatSucess.png)

> 运行成功浏览器中如下
> ![](https://cdn.ionestar.cn/rocketChat.png)

[参考](http://blog.csdn.net/u011619283/article/details/52971473)

如果运行中出现其他的问题欢迎与我交流
[aboutme](http://wangyaxing.deercv.com/)
[github](https://github.com/funnycoderstar)
[blog](http://ionestar.cn/2017/09/01/wxapp/#more)
