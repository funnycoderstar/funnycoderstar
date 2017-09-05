---
title: 总结微信小程序开发中遇到的坑
date: 2017-09-01 13:36:13
tags: 微信小程序
---
![title](http://www.kviso.com/softnews/UploadPic/2016-12/2016123111185421229.jpg)
总结微信小程序开发中遇到的坑,一些坑你得一个一个的跳啊,/(ㄒoㄒ)/~~
<!--more-->
### 1,[页面跳转和参数传递实例](http://www.jb51.net/article/103590.htm)
> 首先说一下我遇到的需求
有一个我的消息页面,里面的数据都是后端返回的,返回的数据大致如下,有一个是数据url是要控制跳转到哪个页面,可能是tab页面也可能是非tab页面,但是微信小程序中跳转到tab和非tab页面用的api不是同一个,但是在页面中渲染肯定是要用到循环的,难道要再多个参数来判断是跳转到tab页面还是非tab页面?

```js
[
    {
        "id": 2121,
        "title": "test",
        "body": "test",
        "url": "url",
        "pic": "pic",
        "created_at": "2017-07-01 12:34:56"
    }, {
        "id": 2122,
        "title": "test",
        "body": "test",
        "url": "url",
        "pic": "pic",
        "created_at": "2017-07-01 12:34:56"
    },
]
```
- 后一般的小程序中我用的框架是wepy,底部的tab组件就是我自己写的,没有用到小程序自己提供的那一个,因为我们还要实现一个需求,有消息时,底部tab会出现小红点,还有以下弹窗要把底部tab覆盖掉,这些需求如果用小程序提供的那一个tab组件的话根本实现不了;而且不用wepy框架的话,自己做一个tab实现的过程很恶心,小程序虽然实现了组件化,但是它实现的组件化bong不想vue和react那样实现的是真正的组件化,你需要哪个组件就直接import进来,小程序的组件化实现可查看[官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/module.html),js,css和html都是要分别引入的
- 自己实现的tab页面整体是一个非tab页面,所有整个小程序中就不存在绝对的tab页面,所以用navigator这个组件,想要跳转到tab页面可以通过在url上拼接参数

```js
<view class="mesList" wx:for="{{unReadList}}" wx:key="unique">
    <navigator url="/pages/index?tab=0" hover-class="none" >
        <text>{{item.body}}</text>
        <view class="messageTime">{{item.created_at}}</view>
    </navigator>
</view>
```
然后再index页面的onload中判断显示哪个tab
```js
onLoad(options) {
    if (options && options.tab) {
        this.tab = parseInt(options.tab);
        this.$apply();
    }
}
```


### 2,[微信小程序授权处理](https://devework.com/weixin-weapp-auth-failed.html)
- 微信小程序提示授权弹窗,如果用户第一次点击拒绝之后,一段时间将不会再次弹出来,然后用户又不知道什么原因用不了小程序,这是个很糟糕的用户体验,我们应该优雅的处理这种情况
- 采用的解决方法[参考](https://devework.com/weixin-weapp-auth-failed.html)

### 3, 登录问题的处理
- 两个登录接口,一个get,判断是否已经还需要登录,如果返回true,则需要登录,如果返回false,则不需要登录
- 如果返回true,则需要去请求更一个post的登录接口,这时,你需要获取第一个get请求的返回信息中的session,之后每次请求求都需要带上他
- 在返回true的时候还需要做一件事儿,就是把返回信息中的session存储到storage,即调用setStorage,然后在之后每次请求数据的时候在headers里加上这个字段
```js
function getStorage(key) {
    return new Promise(function (resolve, reject) {
        // 先判断本地数据存储有没有cookie
        wx.getStorage({
            key: key,
            success: function (res) {
                resolve(res.data);
            },
            fail: function (res) {
                resolve(null);
            },
        });
    });
}
function setStorage(key, value) {
    return new Promise(function (resolve, reject) {
        wx.setStorage({
            key: key,
            data: value,
            success: function (res) {
                // TODO: 不知道返回什么
                resolve(res.data);
            },
            fail: function (res) {
                reject(res.errMsg);
            },
        });
    });
}
```
### 4,wx.getStorage安卓手机上返回的错误信息是getStorage:fail,ios,getStorage:fail data not found
- 在判断一些api返回的错误信息时,最好不要通过判断具体的错误信息来处理错误
```js
function getStorage(key) {
    return new Promise(function (resolve, reject) {
        // 先判断本地数据存储有没有cookie
        wx.getStorage({
            key: key,
            success: function (res) {
                resolve(res.data);
            },
            fail: function (res) {
                resolve(null);
                // 下面注释的部分即为刚开始犯的错误,导致有可能ios或安卓或部分机型显示不出数据
                // if (res.errMsg == 'getStorage:fail' || res.errMsg == 'getStorage:fail data not found') {
                //     console.log('没有cookie');
                //     resolve(null);
                // } else {
                //     console.log('这是一个问题');
                //     reject(res.errMsg);
                // }
            },
        });
    });
}
```

### 5,小程序解决异步
- 如果项目中没有用到babal,小程序本身的支持只支持到es6的语法,所以解决异步的问题就不能使用es7的async和await,只能使用promise来解决异步,但是每个api上都进行一次封装(如下),这种做法太恶心了
```js
function login() {
    return new Promise(function (resolve, reject) {
        wx.login({
            success: function (res) {
                resolve(res);
            },
            fail: function (res) {
                reject(res.errMsg);
            },
        });
    });
}

```
- 基于微信的API的prototype上进行了promise的封装
```js
function promiseify(func) {
    return (args = {}) => {
        return new Promise((resolve, reject) => {
            func.call(wx, Object.assign(args, {
                success: resolve,
                fail: reject,
            }));
        })
    }
}
for (const key in wx) {
    if (Object.prototype.hasOwnProperty.call(wx, key) && typeof wx[key] === 'function') {
        wx[`_${key}`] = promiseify(wx[key]);
    }
}
```
### 6,怎么保证在调用其他接口之前已经调用过登录的接口了
- 我采用执行队列的方式来解决,问题可以简化为有两个按钮,点击第一个按钮输出这是第几次输出d1,但是必须在点击完d2之后,isPrint变为true时,才允许输出,在isPrint为false的时候点击d1,需要把要输出的内容暂时存储起来,等isPrint变为true时,暂存起来的输出现在才可以输出出来
```js
// html
  <div class="first">按钮一</div>
  <div class="second">按钮二</div>
// js
  const d1 = document.querySelector('.first');
  const d2 = document.querySelector('.second');
  let count = 0; // 用来记录第几次输出
  let isPrint = false; // 是否允许输出
  let arr = []; // 声明一个数组,用来存储

  function clickCount() {
    count++;
    console.log('这是第' + count + '次输出d1');
  }
  d1.onclick = function () {
    console.log(isPrint);
    console.log(arr);
    if (isPrint) {
      if (arr.length === 0) {
        clickCount();
      } else {
        for (let i = 0, len = arr.length; i < len; i++) {
          arr[i]();
        }
      }
    } else {
      arr.push(clickCount);
      console.log('不允许输出');
    }
  };
  d2.onclick = function () {
    isPrint = true;
    console.log(isPrint);
  }

```
###  6,小程序问题
- 不支持跳转外部链接
- text可以解析/n,
- 目前不支持识别图中二维码，
- 背景图片不能用本地图片，
- wx.navigateTo需要跳转的应用内非 tabBar 的页面的路径
- wx.switchTab跳转到tabBar页面，
- wx.showToast(),icon只支持success和loading,但是支持image,且image优先级高于icon
- tabBar页面A   navigatorTo 到页面B，然后B   switchTab 到A，这里A会执行onShow()；
但是我再从A跳到B再switchTab回来，A就不会再执行onShow()了，

###  7,总结
- 有时候在开发者工具上测试时是没有问题的,但是真机测试却有问题,所有开发过程中一定要在多个不同型号的手机上测试;很多时候IOS和安卓api返回的信息不同
- 在手机上打开调试的时候是好的,但是关闭调试后就会出现各种bug,遇到这种情况一定要一步步的去排查原因

#### 8,后采用wepy重构小程序遇到的一些坑
[wepy文档](https://wepyjs.github.io/wepy/#/)
1，Q: 怎么在page组件和component组件中回去到getApp(),就是app里面定义的函数,通过this.$parent只能拿到数据，拿不到方法?
A:可以在this.$parent的_proto上拿到方法,即this.$parent.onLogin
2, Q:怎么实现按需加载
A:在compoent组件中自定义生命周期函数,并手动触发