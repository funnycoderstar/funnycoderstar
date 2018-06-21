---
title: JavaScript编码风格指南
date: 2018-06-19 20:29:59
tags: javascript
categories: javascript
type: "tags"
---
![img](https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e79040fa_1529592401995.png?width=400&height=225)
<!--more-->

# 前言

程序语言的编码风格指南对于一个长期维护的软件而言是非常重要的;好的编程风格有助于写出质量更高、错误更少、更易于 维护的程序。

团队合作需要制定一些代码规范还有利用一些工具来强制要求团队代码的风格统一.毕竟很多情况下以后不一定是由写一手代码的人来维护代码,所以有一个统一的代码风格很重要!!!

最近看了一下[编写可维护的JavaScript](https://book.douban.com/subject/21792530/)和[编写高质量代码:Web前端开发修炼之道](https://book.douban.com/subject/4881987/),根据书中提倡的一些写法,同时结合我个人的经验和喜好做了一些改动,大致整理了如下JavaScript编码风格

# JavaScript编码风格
## 1.缩进
每一行的层级由4个空格组成,避免使用制表符(Tab)进行缩进
```js
if (true) {
    doSomething();
}
```
## 2.行的长度
每行长度不应该超过80个字符.如果一行多于80个字符,应当在一个运算符(逗号,加好等)后换行.下一级应当增加两级缩进(8个字符).
```js
// 好的写法
doSomething(arg1, arg2, arg3, arg4,
        arg5);

// 不好的写法: 第二行只有4个空格的缩进
doSomething(arg1, arg2, arg3, arg4,
    arg5);
// 不好的写法: 在运算符之前换行
doSomething(arg1, arg2, arg3, arg4
        ,arg5);
```
## 3.原始值
特殊值null除了下述情况应当避免使用
- 用来初始化一个变量,这个变量可能被赋值为一个对象
- 用来和一个已经初始化的变量比较,这个变量可以是也可以不是一个对象
- 当函数的参数期望是对象时,被用作返回值传出
```js
// 好的做法
const person = null;
```
判断一个变量是否定义应当使用 typeof 操作符
```js
// 好的写法
if (typeof constiable == 'undefined') {
    // do something
}

// 不好的写法
if (constiable == 'undefined') {
    // do something
}
```
## 4.运算符间距
二元运算符前后必须使用一个空格来保持表达式的整洁.操作符包括赋值运算符和逻辑运算符
```js
// 好的写法
const found = (values[i] === item);
// 不好的写法: 丢失了空格
const found = (values[i]===item);

// 好的写法
if (found && (count > 10)) {
    doSomething();
}
// 不好的写法: 丢失了空格
if (found&&(count>10)) {
    doSomething();
}

// 好的写法
for(let i = 0; i < count; i++) {
    process(i);
}
// 不好的写法: 丢失了空格
for(let i=0; i<count; i++) {
    process(i);
}
```

## 5.括号间距
当使用括号时,紧接左括号之后和紧接右括号之前不应该有空格
```js
// 好的写法
const found = (values[i] === item);
// 不好的写法: 左括号之后有额外的空格
const found = ( values[i] === item);

// 好的写法
if (found && (count > 10)) {
    doSomething();
}
// 不好的写法: 右括号之后有额外的空格
if (found && (count > 10) ) {
    doSomething();
}

// 好的写法
for(let i = 0; i < count; i++) {
    process(i);
}
// 不好的写法: 参数两边有额外的空格
for(let i = 0; i< count; i++) {
    process( i );
}
```

## 6.对象直接量
对象直接量应当使用如下格式
- 起始左花括号应当同表达式保持同一行
- 每个属性的名值对应当保持一个缩进,第一个属性应当在左花括号后另起一行.
- 每个属性的名值对应当使用不含引号的属性名,其后紧跟一个冒号(之前不含空格),而后是值
- 倘若属性值是函数类型,函数体应当在属性名之下另起一行,而且其前后均应保留一个空行
- 一组相关的属性前后可以插入空行以提高代码的可读性
- 结束的右花括号应当独占一行
```js
// 好的写法
const object = {

    key1: value1,
    key2: value2,

    func: function() {

    },

    key3: value3,
};

// 不好的写法: 不恰当的缩进
const object = {
        key1: value1,
        key2: value2,
    };

// 不好的写法:函数体缺少空行
const object = {

    key1: value1,
    key2: value2,
    func: function() {

    },
    key3: value3,
};
```
当对象字面量作为函数参数时,如果值是变量,起始花括号应当同函数名在同一行.所有其余先前列出的规则同样适用

```js
// 好的写法
doSomething({
    key1: value1,
    key2: value2,
});

// 不好的写法
doSomething({ key1: value1, key2: value2 });
```
## 7.注释
频繁地适用注释有助于他人理解你的代码.如下情况应当使用注释
- 代码晦涩难懂
- 可能被误认为错误的代码
- 必要但不明显的针对特定浏览器的代码
- 对于对象,方法或者属性,生成文档是有必要的(使用恰当的文档注释).

### 1).单行注释
使用单行注释当用来说明一行代码或者一组代码.单行注释可能有三种使用方式
- 独占一行的注释,用来解释下一行代码
- 在代码行的尾部的注释,用来解释它之前的代码
- 多行,用来注释掉一个代码块
```js
// 好的写法
if (condition) {

    // 如果代码执行到这里,则说明通过了所有的安全性检测
    allowed();
}

// 不好的写法:注释之前没有空行
if (condition) {
    // 如果代码执行到这里,则说明通过了所有的安全性检测
    allowed();
}

// 不好的写法: 错误的缩进
if (condition) {

// 如果代码执行到这里,则说明通过了所有的安全性检测
    allowed();
}

// 不好的写法: 这里应当用多行注释
// 接下来的这段代码非常难, 那么,让我详细的解释一下
// 1. xxxx
// 2. xxxx
if (condition) {

// 如果代码执行到这里,则说明通过了所有的安全性检测
    allowed();
}
```
对于代码行尾单行注释的情况,应确保代码结尾同注释之间至少一个缩进
```js
// 好的写法
const result = something + somethingElse; // somethingElse will never be null

// 不好的写法: 代码和注释间没有足够的空格
const result = something + somethingElse;// somethingElse will never be null
```
注释一个代码块时在连续多行使用单行注释是唯一可以接受的情况.多行注释不应当在这种情况下使用
```js
// 好的写法
// if(condition) {
//     doSomething();
// }
```

### 2).多行注释
多行注释应当在代码需要更多文字去解释的时候使用.每个多行注释都至少有如下三行.
1.首行仅仅包括 /* 注释开始.该行不应当有其他文字
2.接下来的行以 * 开头并保持左对齐.这些行可以由文字描述
3.最后一行以 */开头并同先前行保持对齐.也不应当有其他文字

多行注释的首行应当保持同它描述代码的相同层次的缩进.后续的每行应当有同样层次的缩进并附加一个空格(为了适当保持 * 字符的对齐).每一个多行代码之前应当预留一个空格
```js
// 好的写法
if (condition) {

    /*
     * 如果代码执行到这里
     * 说明通过了所有的安全性检测
    */
    allowed();
}

// 不好的写法: 注释之前无空行
if (condition) {
    /*
     * 如果代码执行到这里
     * 说明通过了所有的安全性检测
    */
    allowed();
}
// 不好的写法: 星号后没有空格
if (condition) {

    /*
     *如果代码执行到这里
     *说明通过了所有的安全性检测
    */
    allowed();
}
// 不好的写法: 错误的缩进
if (condition) {

/*
 * 如果代码执行到这里
 * 说明通过了所有的安全性检测
*/
    allowed();
}

// 不好的写法: 代码尾部注释不要用多行注释格式
const result = something + somethingElse; /* somethingElse 不应当取值为null */
```
### 3)注释声明
注释有时候可以用来给一段代码声明额外的信息.这些声明的格式以单个单词打头并紧跟一个双引号.可使用的声明如下
- TODO: 说明代码还未完成.应当包含下一步要做的事情
- HACK: 表明代码实现走了一个捷径
- XXX: 说明代码是有问题的并应当尽快修复
- FIXME: 说明代码是有问题的并应当尽快修复.重要性略次于XXX
- REVIEW: 说明代码任何可能的改动都需要评审
这些声明可能在一行或多行注释中使用,并且应当遵循同一般注释类型相同的格式规则
```js
// 好的写法
// TODO: 我希望找到一种更快的方式
doSomething();
// 不好的写法: 注释声明空格不正确
// TODO :  我希望找到一种更快的方式
doSomething();

// 好的写法
// REVIEW: 有更好的方法吗?
doSomething();
// 不好的写法: 代码和注释应当保持同样的缩进
    // REVIEW: 有更好的方法吗?
doSomething();
```

## 8.命名
变量命名应当采用驼峰命名格式,首字母小写,每个单词首字母大写.变量名的第一个单词应当是一个名词(而非动词)比避免同函数混淆.不要在变量名中使用下划线
```js
// 好的写法
const myName = 'Jack';

// 不好的写法: 大写字母开头
const MyName = 'Jack';

// 不好的写法: 动词开头
const getMyName = 'Jack';

// 不好的写法: 使用下划线
const my_name = 'Jack';
```

函数命名应当采用驼峰命名格式.函数名的第一个单词应当是动词(而非名词)来避免同变量混淆.函数名中最好不要使用下划线.
```js
// 好的写法
function doSomething() {
    // 代码
}

// 不好的写法: 大写字母开头
function DoSomething() {
    // 代码
}
// 不好的写法: 名词开头
function car() {
    // 代码
}
// 不好的写法: 使用下划线
function do_something() {
    // 代码
}
```
构造函数--通过new元素安抚创建新对象的函数--也应使用驼峰合适命名,首先首字母大写.构造函数命名应当以非动词开头,因为new代表着创建一个对象实例的操作

```js
// 好的写法
function MyObject() {

}
// 不好的写法: 小写字母开头
function myObject() {
    
}
// 不好的写法: 使用下划线
function My_Object() {
    
}
// 不好的写法: 动词开头
function getMyObject() {
    
}
```
常量(不会被改变的变量)的命名应当是所有字母大写,不同单词之间用单个下划线隔开.ES6中使用const来声明一个常量
```js
// 好的写法
const TOTAL_COUNT = 10;
// 不好的写法
const totalCount = 10;
// 不好的写法: 混合模式
const total_COUNT = 10;
```
对象的属性同变量的命名规范相同.对象的方法同函数的命名规则相同.如果属性或者方法是私有的,应当在之前加一个下划线
```js
// 好的写法
const object = {
    _count: 10,

    _getCount: function() {
        return this._count;
    }
}
```
## 9.赋值
当给变量赋值时,如果右侧是含有比较语句的表达式,需要用圆括号包裹
```js
// 好的写法
const flag = (i < count);

// 不好的写法:遗漏圆括号
const flag = i < count;
```
## 10.等号运算符
使用 === (严格相等) 和 !==(严格不相等)代替 ==(相等) 和 !=(不等) 来避免弱类型转换错误
```js
// 好的写法
const same = (a === b);

// 不好的写法: 使用 == 
const same = (a == b);
```
## 11.三元操作符
三元运算符应当仅仅用在条件赋值语句中,而不要作为if语句的替代品.
```js
// 好的写法
const value = condition ? value1 : value2;

// 不好的写法: 没有赋值,应当使用 if 表达式
condition ? doSomething() : doSomethingElse();
```

## 12.语句
### 简单语句
每一行最多只包含一条语句.所有简单的语句都应该以分号(;)结束.
```js
// 好的写法
const a = 1;
const b = 2;
const c = a + b;

// 不好的写法: 多个表达式写在一行
const a = 1;const b = 2;const c = a + b;
```
### 返回语句
返回语句当返回一个值的时候不应当使用圆括号包裹,除非在某些情况下这么做可以让返回值更容易理解.例如:
```js
return;
return collection.size();
return (size > 0 ? size : defaultSize)
```
### 复合语句
复合语句是大括号括起来的语句列表;
- 括起来的语句应当较复合语句多缩进一个层级
- 开始的大括号应当在复合语句所在行的末尾;结束的大括号应当独占一行且同复合语句的开始保持同样的缩进.
- 当括号时控制结构的一部分时,诸如if或者for语句,所有语句都需要用打括号括起来,也包括单个语句.这个约定使得我们更方便地添加语句而不用担心忘记加括号而引起bug
- 像if一样的语句开始的关键词,其后应当紧跟一个空格,起始大括号应当在空格之后

#### if语句
```js
if (condition) {
    statements
} else if (condition) {
    statements
} else {
    statements
}
```
绝不允许在if语句中省略花括号
```js
// 好的写法
if (condition) {
    doSomething();
} 
// 不好的写法: 不恰当的空格
if(condition){
    doSomething();
} 
// 不好的写法: 遗漏花括号
if (condition) 
    doSomething();

// 不好的写法: 所有代码写在一行
if (condition) { doSomething(); }
// 不好的写法: 所有代码写在一行且没有花括号
if (condition) doSomething();

```
#### for语句
```js
for (initialization; condition; update) {
    statements
}

for (constiable in object) {
    statements
}
```
当使用 for-in 语句时,记得使用 hasOwnProperty() 进行双重检查来过滤出对象的成员

#### while语句
```js
while (condition) {
    statements
}
```

#### do语句
```js
do {
    statements
} while (condition)
```
#### switch语句
```js
switch (expression) {
    case expression:
        statements
    default:
        statements
}
```
switch下的每一个case都叮当保持一个缩进.除第一个之外包括default在内的每一个case都应当在之前保持一个空行
每一组语句(除了default)都应当以break, return, throw结尾,或者用一行注释表示跳过
```js
// 好的写法
switch (value) {
    case 1:
       /* falls through */
    case 2:
        doSomething();
        break;
    case 3:
       return true;
    default:
       throw new Error('this should not happen');
}
```
#### try语句
```js
try {
    statements
} catch (constiable) {
    statements
} finally {
    statements
}
```

## 13.严格模式
严格模式应当仅限在函数内部使用,千万不要在全局使用.
> ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

## 14.变量声明
所有的变量在使用前都应事先定义.变量定义应放在函数开头.
变量定义前应当初始化,并且赋值操作符应当保持一致的缩进.初始化的变量应当在未初始化变量之前.
> 推荐使用[ES6的`let`和 `const`](http://es6.ruanyifeng.com/#docs/let)来声明变量

## 15.函数声明
函数声明应当在使用前提前定义.
一个不是作为方法的函数(也就是没有作为一个对象的属性)应当使用函数定义的格式(不是函数表达式和[Function构造器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)格式).
函数名和开始圆括号之前不应当有空格.结束的圆括号和右边的花括号之间应该留一个空格.右侧的花括号应当同function关键字保持同一行.开始和结束括号之间不应该有空格.参数名之间应当在逗号之后保留一个空格.函数体应当保持一级缩进
```js
// 好的写法
function doSomething(arg1, agr2) {
    return arg1 + arg2;
}
// 不好的写法: 第一行不恰当的空格
function doSomething (arg1, agr2) {
    return arg1 + arg2;
}
// 不好的写法: 
const doSomething = function doSomething(arg1, agr2) {
    return arg1 + arg2;
}
// 不好的写法: 左侧的花括号位置不对
function doSomething(arg1, agr2)
{
    return arg1 + arg2;
}
// 错误的写法: 使用Function构造器
const doSomething = new Function('arg1', 'agr2', 'return arg1 + arg2');
```
## 16.留白
在逻辑相关的代码块之间添加空行可以提高代码的可读性

两行空行权限在如下情况使用
- 在不同的源代码文件之间
- 在类和接口定义之间

单行空行权限在如下情况使用
- 方法之间
- 方法中局部变量和第一行语句之间
- 多行或单行注释之前
- 方法中逻辑代码块之间以提高代码的可读性

空格应当在如下情况中使用
- 关键词后跟括号的情况应当用空格隔开
- 参数列表中逗号之后应当保留一个空格
- 所有的除了点(.)之外的二元运算符,其操作数都应当用空格隔开.单目运算符的操作数之间不应该用空白隔开,诸如一元减号,递增(++),递减(--)
- for语句中的表达式之间应当用空格隔开

## 17. 需要避免的
- 切勿使用像String一类的原始包装类型创建的新对象
- 避免使用eval()
- 避免使用with语句.改语句在严格模式中不复存在,可能在未来也将去除

# 使用工具(eslint)来强制约束

## eslint 规则
eslint规则在.eslintrc.js中定义,觉得不合理的可以禁掉某条规则,或者有好的建议的也可以添加;
主要注意一下几条:
- 代码缩进用4空格
- 语句必须默认后加分号
- 使用单引号
- 提交代码前将console.log语句删掉或注释掉(不然影响其他开发人员调试)
- 禁止使用const,使用es6的let,const声明变量

还有一些情况是不需要检测的,例如第3方的库, 框架、组件、ui库等等,可以将这些文件放在.eslintignore文件中,可以忽略eslint的检测

在文件顶部加上下面这行,可以禁掉整个文件的eslint规则
```js
/* eslint-disable */
```
## pre-commit
代码提交之前会强制code-review,不符合规范的不允许提交代码
使用方法
1.在命令行安装
```js
npm i --save-dev pre-commit
```
2.在package.json中配置
```js
{
    "scripts": {
        "eslint": "eslint ./ --ext js,vue --ignore-pattern .eslintignore --cache --fix",
        "lint-message": "echo '开始 eslint 检查, 存在 error 则会拒绝提交'"
    },
    "pre-commit": [
        "lint-message",
        "eslint" // 进行eslint检查并自动修复一些简单的格式错误
    ],
}

```
代码提交之前会强制code-review,不符合规范的不允许提交代码

如果项目实在没时间去改的话，可以 `git commit -m 'XXX' --no-verify 或 git commit -n 'xxx' `强制提交

## 小技巧-vscode可以配置保存自动修复eslint错误
vscode安装eslint插件,在配置中配置如下
```js
{
     "eslint.autoFixOnSave": true,
     "eslint.enable": true,
     "eslint.options": {
        "extensions": [".js", ".vue", ".jsx"]
     },
     "eslint.validate": [
          {

              "language": "vue",
              "autoFix": true
          },
          {
              "language": "javascript",
              "autoFix": true
          },
          {
              "language": "javascriptreact",
              "autoFix": true
          }
      ],
}

```
> 配置完成之后,每次保存,都会自动根据 `.eslintrc.js`文件自动修复空格,分号的错误;但是最好还是在平常的编码中养成一个良好的习惯,而不是依赖工具.

下列参考给出的文章及书籍，有时间一定要好好看一下，会帮助大家深刻理解JavaScript编码风格的重要性。永远记住，规范能解决大部分问题。

# 参考
- [编写可维护的JavaScript](https://book.douban.com/subject/21792530/)
- [编写高质量代码:Web前端开发修炼之道](https://book.douban.com/subject/4881987/)
- [代码整洁之道](https://book.douban.com/subject/4199741/)
- [ESLint](https://eslint.org/)
- [JavaScript编码风格](http://www.ruanyifeng.com/blog/2012/04/javascript_programming_style.html)
