---
title: Meteor 填坑之旅
tags: Meteor
---
## 1,是否有一个事件可以出发,放插入一条新的消息,我可以订阅?
做一个聊天的功能,当有新消息插入到数据库时,我需要判断当前聊天是否存在于用户的聊天列表中(如果不存在也需要创建有新消息的聊天)以及在这个页面做声音,但是Meteor的前后端数据都是响应的,后端数据增加,前端数据自动更新显示.是否有一个事件可以出发,放插入一条新的消息,我可以订阅?
[meteor insert document event](https://stackoverflow.com/questions/29022760/meteor-event-for-subscriber-of-collection-for-new-insert-of-document-in-mongodb)
[METEOR COLLECTIONFS – GET NOTIFIED WHEN A FILE STORAGE COMPLETES](https://krishprasadar.wordpress.com/)
[Meteor-CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS/issues/264)

我的实现方法: 每条消息加一个ReadedMembers字段,记录消息是谁已经读过了,如果 `ReadedMembers.includes(selfId)`的值为false,就表明当前消息你还未读,依次来表示未读消息
## 2, 取出populate关联表数据

Message 表的 from 字段关联到了 User 表, 默认情况下查询结果的 from 字段是 user id, 而我们需要的是该 user 的数据. 我们使用 [reywood:publish-composite](https://atmospherejs.com/reywood/publish-composite) 获取关联表数据, 例如取出 message 的 from 字段的数据:

```js
publishComposite('message', {
    find() {
        return Message.find({});
    },
    children: [{
        find(message) {
            message.from = Meteor.users.findOne(
                { _id: message.from },
                {
                    fields: {
                        username: 1,
                        profile: 1,
                    },
                },
            );
        },
    }],
});
```
### 自己定义populate方法
在做邀请新的好友入群的时候,添加新的好友,利用[reywood:publish-composite](https://atmospherejs.com/reywood/publish-composite)并不会自动更新数据,所以以后直接自己在客户端定义方法
这样做的好处是解决了取关联数据不会自动更新的bug,但是有点麻烦的是每次需要关联数据的时候必须在客户端调用一次方法,正在考虑有没有更好的解决方法
```js
import { Meteor } from 'meteor/meteor';

const PopulateUtil = {
    group(group) {
        if (group) {
            group.members = Meteor.users.find({ _id: { $in: group.members } }).fetch();
            group.admin = Meteor.users.findOne({ _id: group.admin });
        }
    },
    groups(groups) {
        groups.forEach(group => PopulateUtil.group(group));
    },
};

export default PopulateUtil;
```
3, 代码高亮
```js
getHighlightedText = (text, higlight) => {
        // Split on higlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${higlight})`, 'gi'));
        return (<span> {parts.map((part, i) =>
            (<span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { color: '#29b6f6' } : {}}>
                {part}
            </span>))
        } </span>);
    }
```
4, 如何在Meteor.call()改为promise,async/await形式
方法一:
```js
function callMeteorMethod(methodName, ...args) {
    return new Promise((resolve, reject) => {
        Meteor.call(methodName, ...args, (error, result) => {
            if (error) reject(error)
            else resolve(result)
        })
    })
}


async function main() {
    let result = await callMeteorMethod('foo', 1, 2, 3)
    console.log(result)
}

main()
```
方法二:

```js
meteor add deanius:promise
```
[](https://forums.meteor.com/t/start-using-async-await-instead-of-promises-and-callbacks/17037/5)
[deanius/meteor-promise](https://github.com/deanius/meteor-promise)

更多坑待填...

5,Meteor实现数据实时响应的原理

6,Meteor和socket.io结合使用,总是重复的自己断开,自己连接
7,写文件名的时候层级过长,有没有一种方法可以想vue,那套可以配置,用@代替的