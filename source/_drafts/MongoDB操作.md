---
title: MongoDB操作
date: 2017-12-12 09:47:40
tags:
---

## 数据更新操作符

1. $inc
```js
{ $inc: { field: value} }
```
对一个数字字段的某个field增加value
2. $set
```js
{ $set: { field: value} }
```
重新设置field的值为value
3. $unset
```js
{ $unset: { field: 1} }
```
删除字段
4. $push
```js
{ $pushAll: { field: value} }
```
将value值追加到field里,field一定是数组类型,如果field不存在,会新增一个数组类型加进去
5. $pushAll
```js
{ $pushAll: { field: value_array} }
```
用法同$push一样,只是$pushAll一次可以追加多个值到一个数组字段内
6. $addToSet
```js
{ $addToSet: { field: value} }
```
加一个值到数组内,而且只有当这个值不在数组内才添加
7. $pop
此操作符用于删除数组中的一个值
删除第一个值
```js
{ $pull: { field: -1} }
```
删除最后一个值
```js
{ $pull: { field: 1} }
```
8. $pull
```js
{ $pull: { field: value} }
```
从数组field内删除一个等于value值.
9. $pullAll
```js
{ $pushAll: { field: value_array} }
```
用法同$pull,可以一次性删除数组内的多个值

10. $rename
```js
{ $rename: { old_field_name: new_field_name} }
```
此操作符可以完成字段的重命名