---
title: 总结微信小程序开发中遇到的坑
tags: 微信小程序
---

#### 1,页面跳转和参数传递实例
首先说一下我遇到的需求
有一个我的消息页面,里面的数据都是后端返回的,有一个

#### 2,wx.getStorage安卓手机上返回的错误信息是getStorage:fail,ios,getStorage:fail data not found

#### 3,[微信小程序授权处理](https://devework.com/weixin-weapp-auth-failed.html)

#### 4, 登录问题的处理


#### 5,小程序解决异步
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
#### 6,怎么保证在调用其他接口之前已经调用过登录的接口了
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
#### 6,小程序问题
- 不支持跳转外部链接
- text可以解析/n,
- 目前不支持识别图中二维码，
- 背景图片不能用本地图片，
- wx.navigateTo需要跳转的应用内非 tabBar 的页面的路径
- wx.switchTab跳转到tabBar页面，
- wx.showToast(),icon只支持success和loading,但是支持image,且image优先级高于icon
- tabBar页面A   navigatorTo 到页面B，然后B   switchTab 到A，这里A会执行onShow()；
但是我再从A跳到B再switchTab回来，A就不会再执行onShow()了，

#### 7,总结
- 有时候在开发者工具上测试时是没有问题的,但是真机测试却有问题,所有开发过程中一定要在多个不同型号的手机上测试;很多时候IOS和安卓api返回的信息不同

#### 8,后采用wepy重构小程序遇到的一些坑
[wepy文档](https://wepyjs.github.io/wepy/#/)
1，怎么在page组件和component组件中回去到getApp(),就是app里面定义的函数,通过this.$parent只能拿到数据，拿不到方法
可以在this.$parent的_proto上拿到方法,即this.$parent.onLogin
2，index  => step => rank => faidRank => rankList ，faidRank里面的修改后的数据怎么传到rankList中
修改数据必须加上this.$apply()
3, 怎么实现按需加载(在compoent组件中自定义生命周期函数,并手动触发)