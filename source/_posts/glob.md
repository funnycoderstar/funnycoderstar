
---
title: glob简介
date: 2018-01-05 10:10:36
tags: glob
categories: [glob]
type: "tags"
---

## 前言
glob是shell使用的路径通配符,类似于正则表达式,但是与正则表达式不完全相同,在linux操作中如文件匹配等等已经使用了glob通配符;
<!--more-->
## 语法和使用
- *:匹配一个路径部分中0或多个字符, 注意不匹配以.开始的路径,比如.a
- **: 匹配0个或多个子文件夹
- ?:匹配一个字符
- [...]: 匹配以系列字符,如[abc]匹配字符a,b,c,在[^...]和[!...]表示匹配不在列表中的字符,如[^abc]匹配出了a,b,c以外的字符.
- {a,b}: 匹配a或者b, a和b也是通配符,可以由其他通配符组成
- !: 排除文件,如!a.js表示排除文件a.js


glob非常强大的用途在于路径匹配，大部分的平台和开发语言都会在配置中使用glob路径匹配，其普遍性几乎使其成为一种标准。

## 实例
#### 1.基于node的gulp时遇到glob匹配文件路径

获取js目录下的所有js文件.(不包括以'.'开头的文件)
```js
//*:匹配路径中某部分:0个或多个字符
glob("js/*.js",function (er, files) {
    console.log(files)
})
```

#### 2.`.gitignore`中遇到glob匹配文件路径
```js
# 此为注释 – 将被 Git 忽略
    # 忽略所有 .a 结尾的文件
    *.a
    # 但 lib.a 除外
    !lib.a
    # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
    /TODO
    # 忽略 build/ 目录下的所有文件
    build/
    # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
    doc/*.txt
```
.gitigore的格式规范
- 所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配
- 匹配模式最后跟反斜杠（/）说明要忽略的是目录。
- 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

## 参考
[node-glob](https://github.com/isaacs/node-glob)
[node-glob使用记](http://blog.csdn.net/tangxiaolang101/article/details/53931145)