---
title: git学习总结
date: 2017-10-12 17:40:36
tags: git
categories: [git]
type: "tags"
---
![title](http://static.open-open.com/lib/uploadImg/20141015/20141015084602_745.png)
<!--more-->
# 1,git简介
## 版本控制
简而言之,就是可以报存你所有的修改,所有的历史版本;有了它,就可以将某个文件回溯到之前的状态,甚至可以将整个项目回退到过去某个时间点的状态;你可以比较文件的变化细节，查出最后是谁修改了哪个地方，从而找出导致怪异问题出现的原因，又是谁在何时报告了某个功能缺陷等等
## 类别
### 集中化的版本控制系统(eg: svn)
![](http://git.oschina.net/progit/figures/18333fig0102-tn.png)
### 分布式版本控制系统(eg: git)
![](http://git.oschina.net/progit/figures/18333fig0103-tn.png)
## 文件的三种状态
对于任何一个文件，在 Git 内都只有三种状态：
- 已提交（committed），已提交表示该文件已经被安全地保存在本地数据库中了；
- 已修改（modified,已修改表示修改了某个文件，但还没有提交保存；
- 已暂存（staged）。已暂存表示把已修改的文件放在下次提交时要保存的清单中。
git管理项目时,文件流转的三个工作区域:git的工作目录,暂存区域,本地仓库
![](http://git.oschina.net/progit/figures/18333fig0106-tn.png)
- 每个项目都有一个Git目录(如果 git clone 出来的话，就是其中 .git 的目录)
- 从项目中取出某个版本的所有文件和目录，用以开始后续工作的叫做工作目录
- 所谓的暂存区域只不过是个简单的文件，一般都放在 Git 目录中
![](http://oo4xdz5i0.bkt.clouddn.com/git.png)

# 2,git基础
## 取得项目的Git仓库
有两种方法:1,在现存的目录下,通过导入所有文件来创建新的Git仓库;2,从已有的Git仓库克隆出一个新的镜像仓库
- 在工作目录中初始化新仓库
```
git init // 初始化后，在当前目录下会出现一个名为 .git 的目录，所有 Git 需要的数据和资源都存放在这个目录中
git add README // 如果当前目录下有几个文件想要纳入版本控制,需要先用`git add`命令告诉git开始对这些文件进行跟踪,并进行提交
git commit -m 'initial project version'
```
- 从现有仓库克隆
克隆仓库的命令格式为 git clone [url]。比如，要克隆 Ruby 语言的 Git 代码仓库 Grit，可以用下面的命令：
```
git clone git://github.com/schacon/grit.git
```
当前目录下创建一个名为`grit`的目录,其中包含一个`.git`的目录用于保存下载下来的所有版本记录,然后从中取出最新版本的文件拷贝
如果希望在`git clone`的时候,自己定义要新建的项目目录的名称,可以再上面的命令的末尾指定新的名字
```
git clone git://github.com/schacon/grit.git mygrit
```
现在新建的目录就成了`mygrit`