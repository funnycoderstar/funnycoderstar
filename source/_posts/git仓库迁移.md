
---
title: git仓库迁移
date: 2018-01-06 17:40:36
tags: git
categories: [git]
type: "tags"
---
## 需求背景:
需要将原来放置gitlab的仓库迁移到集团gitlab,需要将所有分支和tag都迁移过去

<!--more-->

## 实现方式

1.将代码从原有仓库中拉下来
```js
git clone remote_git_address(remote_git_address为新服务器gitLab上新建的同名项目地址)

```
2.设置把本地gitlab地址替换成为集团gitlab地址
```js
git remote set-url origin remote_git_address（remote_git_address为新服务器gitLab上新建的同名项目地址）

```

3.本地仓库推送到远程
```js
git push origin --all 推送主干和分支

git push --tags 推送标签
```

## 相关知识

#### `git checkout` 用法
```js
git checkout --orphan latest_branch
```
假如你的某个分支上，积累了无数次的提交，你也懒得去打理，打印出的log也让你无力吐槽，那么这个命令将是你的神器，它会基于当前所在分支新建一个赤裸裸的分支，没有任何的提交历史，但是当前分支的内容一一俱全
新建的分支，严格意义上说，还不是一个分支，因为HEAD指向的引用中没有commit值，只有在进行一次提交后，它才算得上真正的分支。

#### `git remote `用法

git remote -v 查看现有远程仓库的地址url

##### 修改及添加远程地址

1.修改命令
```js
git remote set-url origin <URL> 更换远程仓库地址,把<URL>更换为新的url地址
```

2.先删后加
```js
git remote rm origin
git remote add origin remote_git_address（remote_git_address为新服务器gitLab上新建的同名项目地址）
```

3.直接修改配置文件

你可能想让你的代码拥有两个甚至更多远程仓库,
你可以再添加一个远程库: git remote add origin2; 这个方法很低效,因为你要git push 两次才能完成push到两个库

其实还有一个方法,git的一个远程库可以对应多个地址,即我能让远程库origin拥有多个url地址,方法如下:
首先，我们从零开始， 
假设你现在想要增加3个远程库地址，分别为:
<url1> 
<url2> 
<url3> 
首先，先增加第一个地址 git remote add origin <url1> 
然后增加第二个地址 git remote set-url --add origin <url2> 
增加第三个地址 git remote set-url --add origin <url3> 
….依次类推

这样就完成了添加多个地址到origin库中了， 
以后只要使用git push origin master 就可以一次性push到3各库里面了(使用git push也可)

原理解析
git remote set-url --add origin 就是往当前git项目的congig文件里增加一行记录
config文件打开方式有两种:
- 使用命令 `git config -e`
- 在当前git项目的根目录下，文件位于 .git/config (.git目录为隐藏文件)
你每执行一次git remote set-url --add origin 就会增加一行，如下图：

git remote -v:显示当前所有远程库的详细信息，显示格式为 远程库名字 url连接(类型)
![img](http://static.oschina.net/uploads/space/2014/0807/173051_96yi_574576.jpg)
你直接在config里面直接添加url来修改也是可以的,不必去执行git命令

注意:

使用 `git push origin master`时,你可以push到origin的的多个url地址,
但是使用git pull 时,只能拉去origin里的一个url地址(即fetch-url,如上图),这个fetch-url默认为添加的到origin的第一个地址;
如果你想更改，只需要更改config文件里，那三个url的顺序即可，fetch-url会直接对应排行第一的那个utl连接。

## 参考

- [gitlab project项目迁移](http://blog.csdn.net/lcyaiym/article/details/77678467)
- [Git远程仓库 git remote](http://blog.csdn.net/s0228g0228/article/details/45368155)