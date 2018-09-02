---
title: 前端路由history vs hash
date: 2017-9-10 13:18:03
tags: javascript
categories: javascript
type: "javascript"
---
![](//7xr2s7.com1.z0.glb.clouddn.com/%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1%E7%9A%84%E4%B8%A4%E7%A7%8D%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%861.jpg)
<!--more-->
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
我们经常在url中看到#,这个#有两个情况,一个是我们所谓的锚点,比如典型的回到顶部按钮原理,github上各个标题之间的跳转等,路由里的#不叫锚点,我们称之为hash,大型框架的路由系统大多都是哈希实现的
onhashchange 事件在当前 URL 的锚部分(以 '#' 号为开始) 发生改变时触发
## hashhistory与browserhistory
- 使用 hashHistory，浏览器上看到的 url 会是这样的: /#/user/haishanh?_k=adseis
- 使用 browserHistory，浏览器上看到的 url 会是这样的：/user/haishanh
- 看起来当然browerHistory很好很理想,但browweHistory需要server端支持,而使用hashHistory的时候，因为 url 中 # 符号的存在，从 /#/ 到 /#/user/haishanh 浏览器并不会去发送一次 request，react-router 自己根据 url 去 render 相应的模块。
- 而使用 browserHistory 的时候，浏览器从 / 到 /user/haishanh 是会向 server 发送 request 的。所以 server 端是要做特殊配置的。比如用的 express 的话，你需要 handle 所有的路由 app.get('*', (req, res) => { ... })，使用了 nginx 的话，nginx也要做相应的配置。
所以你的 App 是静态，没有服务端的话，只能用 hashHistory。