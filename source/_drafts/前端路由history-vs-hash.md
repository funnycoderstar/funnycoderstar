---
title: 前端路由history vs hash
tags: javascript
---

## history路由机制
用户访问网页的历史记录通常会被保存在一个类似栈对象中,即history对象,点击返回就出栈,跳下一页就入栈.它提供了一些方法来操作页面的前进和后退:
- window.history.back()返回到上一个页面
- window.history.forward()进入到下一个页面
- window.history.go([delta])跳转到指定页面
HTML5对history Api进行了增强,新增了两个Api和一个事件,分别为pushState,replaceState和onpopstate
pushState是往history对象里添加一个新的历史记录,即压栈
replaceState是替换history对象中的当前历史;
这两个API相同之处都会操作浏览器的历史记录,而不会引起页面的刷新;不同之处在于,pushState会增加一条新的历史记录,而replaceState则会替换当前的历史记录
当点击浏览器后退按钮或js调用history.back都会触发onpopstate事件,与其类似的还有一个事件:onhashchange
## hash路由机制