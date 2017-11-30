---
title: babel
tags:
---

## babel-polyfill的使用场景

Bable默认只转换新的javascript语法,而不转换新的API,例如, Iterator, Generator, Set, Maps, Proxy, Reflect, Symbol, Promise等全局对象,以及定义在全局对象上的方法(比如Object.assign)都不会转译,
如果想使用这些新的对象和方法,必须使用babel-polyfill,

那些需要修改内置api才能达成的功能，譬如：扩展String.prototype，给上面增加includes方法，就属于修改内置API的范畴。这类操作就由polyfill提供。

## babel-runtime使用场景
Bable转义后的代码要实现源代码同样的功能要借助一些帮助函数,例如, `{ [name]: 'javascript'}`转译后的代码,如下所示
```
```

### babel-runtime 为什么适合 JavaScript 库和工具包的实现？
1,避免babel编译的工具函数在每个模块里重复出现,减少库和工具包的体积
2,在没有使用babel-runtime之前,库和工具包一般不会直接引入polyfill,否则像Promise这样的全局对象会污染全局命名空间,这就要求库的使用者自己提供polyfill;

总结
1,具体项目还是需要使用babel-polyfill,只使用babel-runtime的话,实例方法不能正常工作(例如 `'foobar'.includes('foo')`);
2,javascript库和工具可以使用babel-runtime,在实际项目中使用这些库和工具,需要该项目本身提供polyfill ;

## 参考
[babel的polyfill和runtime的区别](https://segmentfault.com/q/1010000005596587)
[babel-polyfill文档](http://babeljs.io/docs/usage/polyfill/)
<!-- https://www.zhihu.com/question/49382420/answer/115692473 -->
