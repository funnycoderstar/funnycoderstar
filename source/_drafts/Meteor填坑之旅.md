---
title: Meteor 填坑之旅
tags:
---
## 1,是否有一个事件可以出发,放插入一条新的消息,我可以订阅?
做一个聊天的功能,当有新消息插入到数据库时,我需要判断当前聊天是否存在于用户的聊天列表中(如果不存在也需要创建有新消息的聊天)以及在这个页面做声音,但是Meteor的前后端数据都是响应的,后端数据增加,前端数据自动更新显示.是否有一个事件可以出发,放插入一条新的消息,我可以订阅?
[meteor insert document event](https://stackoverflow.com/questions/29022760/meteor-event-for-subscriber-of-collection-for-new-insert-of-document-in-mongodb)
[METEOR COLLECTIONFS – GET NOTIFIED WHEN A FILE STORAGE COMPLETES](https://krishprasadar.wordpress.com/)
[Meteor-CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS/issues/264)
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