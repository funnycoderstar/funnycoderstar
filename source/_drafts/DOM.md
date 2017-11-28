---
title: DOM
date: 2017-11-25 22:21:15
tags: DOM
---
# 节点层次

## Node类型
DOM1级定义了一个Node接口,在浏览器中是作为Node类型实现的.Javascript中所有节点类型都是继承自Node类型,因此所有节点类型都共享着相同的基本属性和方法
每个节点都有一个nodeType属性,用于表明节点类型,节点类型由在Node类型中定义的下列12个数值常量表示:
- Node.ELEMENT_NODE(1)
- Node.ATTRIBUTE_NODE(2)
- Node.TEXT_NODE(3)
- Node.CDATA_SECTION_NODE(4)
- Node.ENTITY_REFETENCE_NODE(5)

1,nodeName和nodeValue
对于元素节点:nodeName的值是元素的标签名,nodeValue的值为null
2,节点关系

每个节点都有一个childNode属性,其中保存着一个NodeList对象,NodeList是一个类数组对象,用于保存一组有序的节点,可以通过位置来访问这些节点.
访问保存在NodeList中的节点,可以通过方括号,也可以通过item()方法
每个节点都有一个parentNode属性,执行文档树的父节点,包含在childNodes列表里面的每个节点都是同胞节点,可以通过previousSibling和nextSibling属性,
列表中第一个节点的previousSibling为null,最后一个节点的nextSibling是null
hasChildNodes()在节点包含一或多个子节点的情况下返回true

3,操作节点
- appendChild(newNode), 用于向childNodes列表的末尾添加一个节点,返回新增的节点
- insertBefore(newNode, 作为参照的节点),被插入的节点会变成参照节点的前一个同胞节点(previousSibling)
- replaceChild()要插入的节点和要替换的节点
- removeChild()移除节点,接受参数:要移除的节点,返回被移除的节点
上面方法必须先取得父节点
4,其他方法
- cloneNode():用于创建调用这个方法的节点的一个完全相同的副本,接受不一个布尔值,表示是否执行深复制: 为true时,执行深复制,也就是复制节点及整个文档树;为false时,执行浅复制,只渎职节点本身.复制后的节点副本属于文档所有,但并没有为他制定父节点,需要通过`appendChild()`,`insertBefore()`,或者`replaceChild()`将他添加到文档中
> cloneNode()方法不会复制添加到DOM节点中的Javascript属性,例如事件处理程序,IE存在一个bug,它会复制事件处理程序,所以建议复制之前先移除事件处理程序

- normalize(), 处理文档树种的文本节点,由于解析器的出现或DOM操作的原因,可能会出现文本节点不包含文本,或者接连出现两个文本节点的情况.当在某个节点上调用这个方法时,就会在该节点的后代节点中查找上述两种情况,如果找到了空白文本节点,则删除它;如果找到相邻的文本节点,则将他们合并为一个文本节点
## Document类型
Document类型表示文档,浏览器中,document对象是HTMLDocument(继承自Document类型)的一个实例,表示整个HTML页面;document对象是window对象的一个属性,因此可以当成全局对象来访问;
- nodeType的值为9;
- nodeName的值为"#document";
- nodeValue的值为null;
- parentNode的值为null;
- ownerDocument的值为null

## Element类型

## Text类型

## Comment类型
