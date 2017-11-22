---
title: Meteor 填坑之旅
tags:
---
## 1,是否有一个事件可以出发,放插入一条新的消息,我可以订阅?
做一个聊天的功能,当有新消息插入到数据库时,我需要判断当前聊天是否存在于用户的聊天列表中(如果不存在也需要创建有新消息的聊天)以及在这个页面做声音,但是Meteor的前后端数据都是响应的,后端数据增加,前端数据自动更新显示.是否有一个事件可以出发,放插入一条新的消息,我可以订阅?
[meteor insert document event](https://stackoverflow.com/questions/29022760/meteor-event-for-subscriber-of-collection-for-new-insert-of-document-in-mongodb)
[METEOR COLLECTIONFS – GET NOTIFIED WHEN A FILE STORAGE COMPLETES](https://krishprasadar.wordpress.com/)
[Meteor-CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS/issues/264)

我的实现方法: 每条消息加一个ReadedMembers字段,记录消息是谁已经读过了,如果 `ReadedMembers.includes(selfId)`的值为false,就表明当前消息你还未读,依次来表示未读消息
## 2,Meteor和socket.io结合使用,总是重复的自己断开,自己连接
## 3, 取出populate关联表数据

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
4,`import { withTracker } from 'meteor/react-meteor-data';`withTracker用来跟踪数据,但是存在数据异步更新的问题:

点击删除的时候,将所有未读消息变为已读,但是allUnReload此时不会立刻更新数据,
所以有未读消息时点击删除事此时这个消息列表已经删除,但是此时未读消息条数不会立刻更新,判断有未读消息,不存在该聊天窗口,则创建新的聊天窗口,过了一会数据更新了,未读消息为0

结果不是withTracker的问题,是上面写的一个函数存在异步问题

5, 
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