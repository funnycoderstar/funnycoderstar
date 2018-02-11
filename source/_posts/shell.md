---
title: 使用脚本提升发布效率
date: 2018-01-05 11:10:36
tags: node
categories: [node]
type: "tags"
---
![title](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518340049320&di=6ae86448732258b117fb5a7a2d70b3f6&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F88d701b2b78445f2c4be2f16b1025edca196b59b.jpg)
## Node.js 命令行程序开发

问题: 1.一些重复性的工作能否用脚本来实现? 2.实现自动化发布流程

一些重复性的工作可以考虑写一些脚本,写一个脚本有两个方案,一个是直接在`npm scripts`直接写命令(固定命令,不需要参数)二是用shelljs写一个脚本

<!--more-->

场景: 当前博客是用hexo来搭建的,public目录下的文件是真正需要放在服务器上的代码,我现在的博客仓库管理方式,有两个仓库,一个`funnycoderstar`和一个`deploy`(注:针对该仓库写了一个定时任务,服务器定时拉取该仓库下的代码,即知道推送到该仓库下就以为了上线了),`funnycoderstar`是用来放置项目源码的仓库,`deploy`是用来发布到线上的代码,(即用来存储public目录下的文件),执行 `hexo clean && hexo g`之后都需要将public目录下的文件移到`deploy`仓库下,每次都可以觉得太麻烦了,于是就考虑用shelljs写了一个脚本
git.js
```js
const shell = require('shelljs');
const yargs = require('yargs');
require('shelljs/global');

if(!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}
const argv = yargs.argv._;
cd('../deploy');
exec('git add .');
exec('git commit -m' +`feat:`+ `${argv[0]}`);
exec('git push');
```
在`npm scripts`中写了如下脚本
```js
"publish": "hexo clean && hexo g && cp -r public/* ../deploy && node ./git.js",
```
嘿嘿,这样我每次发布一篇博客的时候直接在命令行执行如下命令就可以了;
```
npm run publish 新增博客
```
## 参考
[npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
[Node.js 命令行程序开发教程](http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)