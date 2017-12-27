---
title: eslint配置
tags:
---
## eslint配置

全局安装
```js
npm install -g eslint
```
局部安装
```js
npm i -D eslint
```
接下来新建一个配置文件.eslintrc.js,或执行以下命令自动生成
```js
eslint --init
```
## 制定环境
要指定配置文件中的环境，请使用env键并指定要启用的环境true。例如，以下启用浏览器和Node.js环境：
```js
{
    "env": {
        "browser": true,
        "node": true
    }
}
```
或者在一个package.json文件中
```js
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "env": {
            "browser": true,
            "node": true
        }
    }
}
```
## 配置规则
ESLint带有大量的规则。您可以使用配置注释或配置文件修改您的项目使用的规则。要更改规则设置，您必须将规则ID设置为以下值之一：

- "off"或者0- 关闭该规则
- "warn"或者1- 将规则打开为警告（不影响退出代码）
- "error"或者2- 将规则打开为错误（触发时退出代码为1）

### 通过内联注释禁用规则
- 要在整个文件中禁用规则警告，请在文件/* eslint-disable */顶部添加块注释：
```
/* eslint-disable */

alert('foo');
```
- 要禁用特定行上的所有规则，请使用以下格式之一的行注释：
```
alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');
```
### 制定全局
> 可以使用文件内部的注释或配置文件来定义全局变量。

- 使用文件内部注释
1.要在JavaScript文件中使用注释来指定全局变量，请使用以下格式
```
/* global var1, var2 */
```
2.如果你想要指定这些全局变量不应该被写入（只读），那么你可以设置每个false标志：
```
/* global var1:false, var2:false */
```
- 要在配置文件中配置全局变量，请使用globals键并指示要使用的全局变量。将每个全局变量名称设置为等于true允许覆盖变量或false禁止覆盖。例如：
```js
{
    "globals": {
        "var1": true,
        "var2": false
    }
}
```
## 参考
- [eslint.org/docs/](https://eslint.org/docs/user-guide/configuring#specifying-environments)