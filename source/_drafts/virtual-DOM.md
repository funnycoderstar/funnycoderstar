---
title: simple-virtual-dom
date: 2017-11-18 21:45:30
tags: react
---

## virtural-dom的模型
一个DOM标签所需的基本元素
- 标签名
- 节点属性,包含样式,属性,事件
- 子节点
- 标识id
```js
{
    // 标签名
    tagName: 'div',
    // 属性
    properties: {
        // 样式
        style: {},
    },
    // 子节点
    children: [],
    // 唯一标识
    key: 1,
}
```
 