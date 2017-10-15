---
title: mongoDB
date: 2017-10-14 15:28:46
tags: mongoDB
categories: mongoDB
type: "tags"
---
![mongoDB](http://oo4xdz5i0.bkt.clouddn.com/mongodb.jpg)
<!--more-->
MongoDB是一个通用的`非关系型`数据库;把文档存在集合中;它们不需要相同的schema,每个文档都可以有不同的schema
Mongoose是一个Node模块;Mongoose的基础知识如下:
- 打开或关闭MongoDB连接;
- 注册schema;
- 添加任务;
- 搜索文档
- 更新文档
- 删除文档
首先可以用npm 命令安装Mongoose;

```bash
npm install mongoose
```
## 1,连接的打开和关闭
装好Mongoose,启动MongoDB服务器,用下面的代码建立到MongoDBd的连接,在下面的例子中是一个叫tasks的数据库
```js
const mongoose = require(' mongoose');
const db = mongoose.connect(' mongodb:// localhost/ tasks');

```
如果要终止MongoDB创建的连接,
```js
mongoose.disconnect();
```
## 2,注册schema
在用MongoDB管理数据时,需要注册schema
```js
const Schema = mongoose.Schema;
const Tasks = new Schema({ 
    project: String,
     description: String 
});
mongoose.model(' Task', Tasks);

```
Mongoose的schema很强大.除了定义数据结构,还可以设定默认值,处理输入,以及加强校验
## 3,添加任务
schema注册好后,你可以访问它,让Mongoose去工作,下面的代码用模型添加了一项任务
```js
const Task = mongoose. model(' Task');
const task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';
task.save( function( err) {
    if (err) throw err;
    console.log(' Task saved.');
});

```
## 4,搜索文档
Task模型的find方法可以用来查找所有文档,或者用一个JavaScript对象指明一个过滤标准来选择特定的文.下面这段代码搜索跟特定项目相关的任务,并输出每项任务的唯一ID和描述
```js
const Task = mongoose.model(' Task');
Task.find({' project': 'Bikeshed'}, function( err, tasks) { 
    for (const i = 0; i < tasks.length; i++) { 
        console.log(' ID:' + tasks[ i]._ id);
        console.log( tasks[ i]. description);
    }
});

```
## 5,更新文档
尽管用模型的find方法可以定位一个文档,然后修改并保存它,但Mongoose还有一个update方法专门来做这个.
下面的代码用Mongoose更新了一个新的文档

```js
const Task = mongoose. model(' Task');
Task.update(
    {_id: '4e65b793d0cf5ca508000001'}, 　 　// 用 内部 ID 更新
    {description: 'Paint the bikeshed green.'},
    {multi: false}, //只 更新 一个 文档
    function( err, rows_ updated) { 
        if (err) throw err;
        console.log(' Updated.');
    }
);

```
## 6,删除文档
在Mongoose中,一旦你取到了文档,要删除它很容易.你可以用文档的内部ID(或其他任何条件,如果你用find代替finById的话)获取和删除文档,代码就像下面弄这样
```js
const Task = mongoose.model(' Task');
Task.findById(' 4e65b3dce1592f7d08000001', function( err, task){
    task. remove();
});

```
## 友情链接
- [robomongo下载](https://robomongo.org/download)
