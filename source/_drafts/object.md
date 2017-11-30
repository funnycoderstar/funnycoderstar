---
title: object
tags:
---
## 理解对象属性
数据属性和访问器属性:

数据属性
- [[Configuable]]: 能否通过delete删除属性从而重新定义属性;是否修改属性的特性;或者能否把属性修改为访问器属性;默认值为true
- [[Enumerable]]: 默认是false, 表示是否能通过for-in遍历返回属性
- [[Writable]]:能否修改属性的值,默认为true
- [[value]]:包含这个属性的数据值;读取属性值的时候,从这个位置读;写入属性值的时候,将新值保存在这个位置,默认为undefined

访问器属性
- [[Configuable]]:能否通过delete删除属性从而重新定义属性;是否修改属性的特性;或者能否把属性修改为访问器属性;默认值为true
- [[Enumerable]]: 默认是false, 表示是否能通过for-in遍历返回属性
- [[Get]]: 读取属性时调用的函数.默认值为undefined;
- [[Set]]: 在写入属性时调用的函数,默认值是undefined

Object.definedpropty(obj, prop, descriptor)


## 理解并创建对象
## 继承对象