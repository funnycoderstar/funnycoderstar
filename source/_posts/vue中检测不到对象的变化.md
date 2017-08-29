---
title: 嘿,使用vue,你注意到了这些了么?
date: 2017-08-23 10:46:53
tags: vue
type: "tags"
categories: vue
---
![title](http://upload-images.jianshu.io/upload_images/1541368-d9be1b3b39abc037?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
<!--more-->
# 问题一:
vue组件之间传递数据,在子组件中我想改变一个从父组件中传过来的值
> 这是父组件
```js

<template>
  <div>
      <Child :message="message"></Child>
  </div>
</template>

<script>
import Child from './child.vue';
export default {
    data() {
        return {
            message: '这是传给子组件的信息',
        };
    },
    components: {
        Child,
    },
};
</script>

```
> 这是子组件
```js
<template>
  <div @click="handleChange">
      {{message}}
  </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                default: '这是默认信息',
            },
        },
        methods: {
            handleChange() {
                this.message = '我是子组件修改后的信息';
            },
        },
    };
</script>

```
如果你这样写就会报一下错误
![title](http://oo4xdz5i0.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-08-24%20%E4%B8%8B%E5%8D%883.12.16.png)
但是在子组件中，我们不要去修改 prop。如果你必须要修改到这些数据，你可以使用以下方法：
- 把 prop 赋值给一个局部变量，然后需要修改的话就修改这个局部变量，而不影响 prop
```js
<template>
  <div @click="handleChange">
      {{newMessage}}
  </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                default: '这是默认信息',
            },
        },
        data() {
            return {
                newMessage: this.message,
            };
        },
        methods: {
            handleChange() {
                this.newMessage = '我是子组件修改后的信息';
            },
        },
    };
</script>

```
# 问题二:
vue中检测不到data的变化,我想把给data中的a赋值一个新的对象(添加一个它本身不存在的属性),然而经过尝试发现直接赋值是行不通的,以下是我做的一下尝试
<!--more-->
```js
<template>
  <div>
      {{a}}
  </div>
</template>

```

```js
 data() {
     return {
         a: {},
     };
 },
 created() {
     setTimeout(() => {
         this.a.b = 1;
     }, 1000)
 },
 watch: {
    a(newVal, oldVal) {
        console.log(`${oldVal}现在变成了${newVal}`);
    },
},

```
- 上面这样写(给对象a添加一个本来不存在的属性b,并给他赋值)并不会触发watch,
![title](http://oo4xdz5i0.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-08-24%20%E4%B8%8B%E5%8D%882.33.48.png)
- [vue文档中](https://cn.vuejs.org/v2/guide/reactivity.html#变化检测问题)也明确表示添加到对象上的新属性不会触发更新,所以我们应该新建一个新的对象并将这个心对象的值赋值给原有的对象
```js
export default {
    data() {
        return {
            a: {},
        };
    },
    created() {
        setTimeout(() => {
            this.a = {
                b: 1,
            };
        }, 500);
    },
    watch: {
        a(newVal, oldVal) {
            console.log(`${oldVal}现在变成了${newVal}`);
        },
    },
};
```
--------
## 由此给大家拓展一个对象的一些知识
### tips1: js取值的两种方式的区别
```js
const obj = {abc:"ss",nn:90};
const v1 = obj.abc; // 使用点的方式
const v2 = obj["abc"]; // 使用中括号的方式
```
在实际项目中一般使用.会方便很多,但是key是变量的话就不能使用.,js对象会理解变量为对象的key值,

```js
const v3 = obj[key];
```

### tips2: 对象深拷贝实现方法
>  先解释什么是深拷贝和浅拷贝

- 浅拷贝是对对象地址的复制,并没有开辟新的栈,复制的结果是两个对象指向同一个地址,修改其中一个对象的属性,另一个对象的属性也会改变
- 深拷贝是开辟新的栈,两个对象对应两个不同的地址,修改一个对象的属性,不会改变另一个对象的属性
> 最简单的如下(方法一)

```js
b = JSON.parse( JSON.stringify(a) )
```
但是会存在一些问题
- 无法复制函数
- 原型链没了，对象就是object，所属的类没了。
> 使用递归(方法二)

```js
const obj1 = {
    name: 'cehsi',
    age: 13,
    friends:['sk','ls'],
}
function deepCopy(o, c) {
    var c = c || {};
    for(const i in o) {
        if(typeof o[i] === 'object') {
            // 判断是对象
            if(o[i].constructor === Array) {
                // 数组
                c[i] = [];
            } else {
                c[i] = {};
            }
            deepCopy(o[i], c[i]);
        } else {
            c[i] = o[i];
        }
    }
    return c;
}
let obj2 = {name: 'result'};
obj2 = deepCopy(obj1, obj2);
console.log(obj2); // { name: 'cehsi', age: 13, friends: [ 'sk', 'ls' ] }
obj2.age = 20;
console.log(obj2, obj1); // { name: 'cehsi', age: 20, friends: [ 'sk', 'ls' ] } { name: 'cehsi', age: 13, friends: [ 'sk', 'ls' ] }
```
> [使用npm install deepcopy](https://www.npmjs.com/package/deepcopy)

### tips3: 深对比,方法参考 http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
> 方法一:Object.toJSON()

```
这个方法简单,但是只适用于两个对象属性相同的情况,在没有方法和DOM节点的情况下，您可以使用简单的JSON样式对象：
```

```js
const obj1 = {
    a: 1,
    b: 2,
}

const obj2 = {
    a: 1,
    b: 2,
}
const obj3 = {
    b: 2,
    a: 1,
}
console.log(JSON.stringify(obj1) === JSON.stringify(obj2)); // true
console.log(JSON.stringify(obj1) === JSON.stringify(obj3)); // false
```
> 方法二: 深度比较两个对象

```
比较对象而不挖掘原型，然后递归地比较属性的投影，还可以比较构造函数。
```
```js

    function deepCompare(x, y) {
        var i, l, leftChain, rightChain;

        function compare2Objects(x, y) {
            var p;

            // remember that NaN === NaN returns false
            // and isNaN(undefined) returns true
            if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                return true;
            }

            // Compare primitives and functions.     
            // Check if both arguments link to the same object.
            // Especially useful on the step where we compare prototypes
            if (x === y) {
                return true;
            }

            // Works in case when functions are created in constructor.
            // Comparing dates is a common scenario. Another built-ins?
            // We can even handle functions passed across iframes
            if ((typeof x === 'function' && typeof y === 'function') ||
                (x instanceof Date && y instanceof Date) ||
                (x instanceof RegExp && y instanceof RegExp) ||
                (x instanceof String && y instanceof String) ||
                (x instanceof Number && y instanceof Number)) {
                return x.toString() === y.toString();
            }

            // At last checking prototypes as good as we can
            if (!(x instanceof Object && y instanceof Object)) {
                return false;
            }

            if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                return false;
            }

            if (x.constructor !== y.constructor) {
                return false;
            }

            if (x.prototype !== y.prototype) {
                return false;
            }

            // Check for infinitive linking loops
            if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                return false;
            }

            // Quick checking of one object being a subset of another.
            // todo: cache the structure of arguments[0] for performance
            for (p in y) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                } else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }
            }

            for (p in x) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                } else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }

                switch (typeof(x[p])) {
                    case 'object':
                    case 'function':

                        leftChain.push(x);
                        rightChain.push(y);

                        if (!compare2Objects(x[p], y[p])) {
                            return false;
                        }

                        leftChain.pop();
                        rightChain.pop();
                        break;

                    default:
                        if (x[p] !== y[p]) {
                            return false;
                        }
                        break;
                }
            }

            return true;
        }

        if (arguments.length < 1) {
            return true; //Die silently? Don't know how to handle such case, please help...
            // throw "Need two or more arguments to compare";
        }

        for (i = 1, l = arguments.length; i < l; i++) {

            leftChain = []; //Todo: this can be cached
            rightChain = [];

            if (!compare2Objects(arguments[0], arguments[i])) {
                return false;
            }
        }

        return true;
    }

```
- 已知问题（他们的优先级很低，可能你永远不会注意到）

- 具有不同原型结构但相同投影的物体
- 函数可能具有相同的文本，但是指的是不同的闭包原型