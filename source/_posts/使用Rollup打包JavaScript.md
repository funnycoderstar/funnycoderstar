---
title: 使用Rollup打包JavaScript
date: 2018-03-07 20:12:33
tags: javascript
categories: javascript
---
![title](https://www.laravel-vuejs.com/wp-content/uploads/2017/08/javascript-module-bundling-with-rollup-js-1900x931_c.jpg)
> rollup是一款小巧的javascript模块打包工具，更适合于库应用的构建工具;可以将小块代码编译成大块复杂的代码，基于ES6 modules,它可以让你的 bundle 最小化，有效减少文件请求大小,[vue](https://github.com/vuejs/vue)在开发的时候用的是webpack,但是最后将文件打包在一起的时候用的是 rollup.js

<!--more-->

[rollup官方文档](https://rollupjs.org/guide/en)
[rollupgithub](https://github.com/rollup)

## 全局安装
```
npm install --global rollup
``` 

## 开始使用rollup

### 创建第一个bundle

创建`main.js`
```
console.log(111);
```
执行 `rollup --input main.js --output bundle.js --format cjs`, 该命令编译 `main.js` 生成 `bundle.js`, `--format cjs` 意味着打包为 node.js 环境代码, 请观察 bundle.js 文件内容

```js
'use strict'
console.log(111);
```
命令行参数简介:

输入(input -i/--input)

String 这个包的入口点 (例如：你的 main.js 或者 app.js 或者 index.js)

文件(file -o/--output.file)
String 要写入的文件。也可用于生成 sourcemaps，如果适用

格式(format -f/--output.format)
关于format选项
rollup提供了五种选项:

- amd – 异步模块定义，用于像RequireJS这样的模块加载器
- cjs – CommonJS，适用于 Node 和 Browserify/Webpack
- es – 将软件包保存为ES模块文件
- iife – 一个自动执行的功能，适合作为`<script>`标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
- umd – 通用模块定义，以amd，cjs 和 iife 为一体

### 使用配置文件
rollup.config.js

```js
export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    }
};
```
执行 `rollup -c rollup.config.js`启动配置项;

rollup 提供了 --watch / -w 参数来监听文件改动并自动重新打包

### 使用rollup插件

```js
npm install --save-dev rollup-plugin-json

```
我们用的是 --save-dev 而不是 --save，因为代码实际执行时不依赖这个插件——只是在打包时使用。

在配置文件中启用插件
```js
import json from 'rollup-plugin-json';
export default {
    input: './main.js',
    output: {
        file: 'bundle.js',
        format: 'umd'
    },
    plugins: [
        json(),
    ],
}
```

新建文件 `data.json`
```js
{
    "name": "xiaoming",
    "age": 12
}
```
在`main.js` 引入 `data.json`

```js
import { name } from './data.json';
console.log(name);
```
执行 `rollup -c rollup.config.js`,并查看 bundle.js

```js
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var name = "xiaoming";

console.log(name);

})));

```
看到bundle中仅引用了data.json中的name字段,这是因为rollup会自动进行 Tree-shaking,main.js中仅引入了name,age并没有没引用,所以age并不会被打包

### rollup基础插件

- [rollup-plugin-alias](https://github.com/rollup/rollup-plugin-alias): 提供modules名称的 alias 和reslove 功能
- [rollup-plugin-babel](https://github.com/rollup/rollup-plugin-babel): 提供babel能力
- [rollup-plugin-eslint](https://github.com/TrySound/rollup-plugin-eslint): 提供eslint能力
- [rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve): 解析 node_modules 中的模块
- [rollup-plugin-commonjs](https://github.com/rollup/rollup-plugin-commonjs): 转换 CJS -> ESM, 通常配合上面一个插件使用
- [rollup-plugin-serve](https://github.com/thgh/rollup-plugin-serve): 类比 webpack-dev-server, 提供静态服务器能力
- [rollup-plugin-filesize](https://github.com/ritz078/rollup-plugin-filesize): 显示 bundle 文件大小
- [rollup-plugin-uglify](https://github.com/TrySound/rollup-plugin-uglify): 压缩 bundle 文件
- [rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace): 类比 Webpack 的 DefinePlugin , 可在源码中通过 process.env.NODE_ENV 用于构建区分 Development 与 Production 环境.

## rollup于其他工具集成
### 打包npm 模块

于webpack和Browserify不同, rollup 不会去寻找从npm安装到你的node_modules文件夹中的软件包;
`rollup-plugin-node-resolve` 插件可以告诉 Rollup 如何查找外部模块
```js
npm install --save-dev rollup-plugin-node-resolve
```

### 打包 commonjs模块

npm中的大多数包都是以CommonJS模块的形式出现的。 在它们更改之前，我们需要将CommonJS模块转换为 ES2015 供 Rollup 处理。
`rollup-plugin-commonjs` 插件就是用来将 CommonJS 转换成 ES2015 模块的。
请注意，`rollup-plugin-commonjs`应该用在其他插件转换你的模块之前 - 这是为了防止其他插件的改变破坏CommonJS的检测
```js
npm install --save-dev rollup-plugin-commonjs
```

### 使用babel
使用 Babel 和 Rollup 的最简单方法是使用 rollup-plugin-babel

```js
npm install --save-dev rollup-plugin-babel
```
新建.babelrc
```js
{
    "presets": [
        ["latest", {
            "es2015": {
                "modules": false
            }
        }]
    ],
    "plugins": ["external-helpers"]
}
```
- 首先，我们设置`"modules": false`，否则 Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败
- 我们使用`external-helpers`插件，它允许 Rollup 在包的顶部只引用一次 “helpers”，而不是每个使用它们的模块中都引用一遍（这是默认行为）
运行 rollup之前, 需要安装`latest preset` 和`external-helpers`插件

```js
npm i -D babel-preset-latest babel-plugin-external-helpers
```

### 一个简单的配置项
```js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
export default {
    input: './main.js',
    output: {
        file: 'bundle.js',
        format: 'umd'
    },
    watch: {
        exclude: 'node_modules/**'
    },
    plugins: [
        resolve(),
        commonjs(),
        json(),
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers'],
        }),
    ],
}
```


## rollup优势
- 自动 Tree-shaking(Tree-shaking, 也被称为 "live code inclusion," 它是清除实际上并没有在给定项目中使用的代码的过程，但是它可以更加高效。)
- 打包速度快
- 配置简单

## rollup VS webpack

rollup更适合构建javascript库,也可用于构建绝大多数应用程序;但是rollup 还不支持一些特定的高级功能，尤其是用在构建一些应用程序的时候，特别是代码拆分和运行时态的动态导入 dynamic imports at runtime.如果你的项目中需要这些功能,则使用webpack更为适合;



