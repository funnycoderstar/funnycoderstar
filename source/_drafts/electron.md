---
title: electron
tags:
---
```
npm install -g electron
npm install -g electron-packager // 打包输出工具
```
Electron提供了丰富的本地(操作系统)的API,使你可以使用纯JavaScript来创建桌面应用程序.与其它各种的Node.js运行时不同的是Electron专注于桌面应用程序而不是Web服务器.
在Electron里,运行在package.json里的main脚本的进程被称为主进程,运行在主进程里的脚本能够通过创建Web页面来显示GUI(图形用户界面)