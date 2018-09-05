---
title: hexo加入gitment功能
date: 2018-09-01 23:00:00
tags: hexo
categories: hexo
type: hexo
---
> 文章首次发表在:[hexo加入gitment功能](https://github.com/funnycoderstar/funnycoderstar/issues/9)

## 前言
[Gitment](https://github.com/imsun/gitment) 是作者实现的一款基于 GitHub Issues 的评论系统。支持在前端直接引入，不需要任何后端代码。可以在页面进行登录、查看、评论、点赞等操作，同时有完整的 Markdown / GFM 和代码高亮支持。尤为适合各种基于 GitHub Pages 的静态博客或项目页面。

<!--more-->
## 使用
> `next(v5.1.4)`支持`gitment`功能

### 使用步骤
### 1.  注册 OAuth Application
点击[https://github.com/settings/applications/new](https://github.com/settings/applications/new])注册，注意Authorization callback URL填自己的网站url, 比如我的 [https://wangyaxing.cn/](https://wangyaxing.cn/)

你会得到一个 client ID 和一个 client secret，这个将用于以下的配置中

### 2.在主题文件下的_config.yml中配置
找到gitment进行配置
```js
gitment:
  enable: true
  mint: true # RECOMMEND, A mint on Gitment, to support count, language and proxy_gateway
  count: true # Show comments count in post meta area
  lazy: false # Comments lazy loading with a button
  cleanly: false # Hide 'Powered by ...' on footer, and more
  language: # Force language, or auto switch by theme
  github_user: Your Github ID
  github_repo: 新建一个代码仓库,用于存储评论内容, 这里千万注意添加仓库名称而不是完整地址
  client_id: # MUST HAVE, Github client id for the Gitment
  client_secret: # EITHER this or proxy_gateway, Github access secret token for the Gitment
 
```
##  遇到的问题
### 1. not fund
出现这个问题的原因是因为配置ower, repo的时候错了

![img](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1536070957901.png?width=588&height=306&imageView2/3/w/537/h/279)
repo指的是仓库名称而不是仓库地址

### 2.点击初始化评论报错 `Error：validation failed`

刚开始看了好多文章, 一直修改`next/layout/_partials/comments.swig`, 而且还加了如下内容, 但是修改完之后一直没有起作用, 后来又查找源码, 发现V5.1.4版本和之前的不太一样, 并不用自己添加一些内容,这也是提醒大家查找解决方法时一定要注意修改的版本号
之前的版本
![gitment1](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1536073465579.png)

现在的版本内容如下:

修改`next/layout/_third-party/comments/gitment.swig`

![gitment](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1536073115006.png?width=1984&height=806)

修改ID由默认的`window.location.pathname`为 `page.date`解决ID长度过长报错问题
### 3.自动初始化评论问题
[初始化评论框方案讨论](https://github.com/imsun/gitment/issues/8)
[自动初始化 Gitalk 和 Gitment 评论](https://draveness.me/git-comments-initialize)