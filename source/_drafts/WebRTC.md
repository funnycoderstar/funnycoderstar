---
title: WebRTC
tags:
---
# 1,WebRTC入门基础
## 什么是WebRTC

WebRtc(Web Real-Time Communication)支持网页浏览器进行实时语音对话或视频对话的技术;

浏览器本身不支持互相之间直接建立信道进行通信,都是通过服务器进行中转.比如现在有两个客户端,甲和乙,他们俩想要通信,首先需要甲和服务器.乙和服务器之间建立信道.甲给乙发送消息时,甲先将消息发送到服务器上,服务器对家的消息进行中转,发送到乙处,反过来也是一样.这样甲和乙之间的依次消息要通过两段信道,通信的效率同时受制于这两端信道的带宽.同时这样的信道并不适合数据流的传输

WebRTC是一个开源项目，旨在使得浏览器能为实时通信（RTC）提供简单的JavaScript接口;让浏览器提供JS的即时通信接口。这个接口所创立的信道并不是像WebSocket一样，打通一个浏览器与WebSocket服务器之间的通信，而是通过一系列的信令，建立一个浏览器与浏览器之间（peer-to-peer）的信道，这个信道可以发送任何数据，而不需要经过服务器。并且WebRTC通过实现MediaStream，通过浏览器调用设备的摄像头、话筒，使得浏览器之间可以传递音频和视频

## 三个接口
WebRTC实现了三个API,分别是:
- MediaStream: 通过MediaStream的API能够通过设备的摄像头及话筒获得视频,音频的同步流
- RTCPeerConnection: RTCPeerConnection是WebRTC用于构建点对点之间稳定高效的流传输的组件
- RTCDataChannel: RTCDataChannel使得浏览器之间(点对点)建立一个高吞吐量.低延时的信道,用于传输任意数据

### MediaStream(getUserMedia)
通过MediaStream的API能够通过设备的摄像头及话筒获得视频,音频的同步流

#### 如果调用
可以通过调用navigator.getUserMedia(),这个方法接受三个参数:
1,一个约束对象(constrains object)
2,一个调用成功的回调函数,如果调用成功,传递给他一个流对象
3,一个调用失败的额回调函数,如果调用失败,传递给他一个错误对象
#### 浏览器的兼容性
```
const getUserMedia = (navigator.getUserMedia || 
                    navigator.webkitGetUserMedia || 
                    navigator.mozGetUserMedia || 
                    navigator.msGetUserMedia);
```
#### 约束对象
可以被设置在`getUserMedia()`和`RTCPeerConnection`的 `addStream`方法中,这个约束对象是WebRTC用来指定接受什么样的流,其中可以定义如下属性
- video: 是否接受视频流
- audio: 是否接受音频流
- MinWidth: 视频流最小宽度
- MaxWidth: 视频流最大宽度
- MinHeight: 视频流最小高度
- MaxHeight: 视频流最大高度
- MinAspectRatio: 视频流最小宽高比
- MaxAspectRatio: 视频流最大宽高比
- MinFramerate: 视频流最小帧速率
- MaxFramerate: 视频流最大帧速率



#### 例子
```js
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>GetUserMedia实例</title>
</head>
<body>
    <video id="video" autoplay></video>
</body>


<script type="text/javascript">
    var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    getUserMedia.call(navigator, {
        video: true,
        audio: true
    }, function(localMediaStream) {
        var video = document.getElementById('video');
        video.src = window.URL.createObjectURL(localMediaStream);
        video.onloadedmetadata = function(e) {
            console.log("Label: " + localMediaStream.label);
            console.log("AudioTracks" , localMediaStream.getAudioTracks());
            console.log("VideoTracks" , localMediaStream.getVideoTracks());
        };
    }, function(e) {
        console.log('Reeeejected!', e);
    });
</script>


</html>

```
这里使用getUserMedia获得流之后,需要将其输出,一般绑定到`video`标签上输出,需要使用`window.URL.createObjectURL(localMediaStream)`来创造能在`video`中使用 `src`属性播放的Blob URL,注意在`video`上加入`autoplay`属性,否则只能扑火到一张图片
流创建完毕后可以通过label属性来获得其唯一的标识，还可以通过getAudioTracks()和getVideoTracks()方法来获得流的追踪对象数组（如果没有开启某种流，它的追踪对象数组将是一个空数组）


## PTCPeerConnection
WebRTC使用RTCPeerConnection来在浏览器之间传递流数据,这个流数据通道是点对点的,不需要经过服务器进行中转.但是这并不意味着我们能抛弃服务器.我们仍然需要它来为我们传递信令来建立这个信道.WebRTC没有定义用于建立信道的信令的协议：信令并不是RTCPeerConnection API的一部分
#### 信令
既然没有定义具体的信令的协议，我们就可以选择任意方式（AJAX、WebSocket），采用任意的协议（SIP、XMPP）来传递信令，建立信道.比如可以用node的ws模块,在在WebSocket上传递信令
需要信令来交换的信息有三种：
- session的信息:用来初始化通信还有报错
- 网络配置: 比如IP地址和端口啥的
- 媒体适配: 发送方和接受方的浏览器能接受什么样的编码器和分辨率

### 通过服务器建立信道
就算WebRTC提供浏览器之间点对点信道的数据传输,但是建立这个信道,必须有服务器的参与,WebRTC需要服务器对其进行4方面的功能支持
- 1,用户发现以及通信
- 2,信令传递
- 3,NAT/防火墙穿越
- 4,如果点对点通信建立失败,可以作为中转服务器

### NAT/防火墙穿越技术
建立点对点信道的一个常见问题，就是NAT穿越技术。在处于使用了NAT设备的私有TCP/IP网络中的主机之间需要建立连接时需要使用NAT穿越技术。以往在VoIP领域经常会遇到这个问题。目前已经有很多NAT穿越技术，但没有一项是完美的，因为NAT的行为是非标准化的。这些技术中大多使用了一个公共服务器，这个服务使用了一个从全球任何地方都能访问得到的IP地址。在RTCPeeConnection中，使用ICE框架来保证RTCPeerConnection能实现NAT穿越

ICE，全名叫交互式连接建立（Interactive Connectivity Establishment）,一种综合性的NAT穿越技术，它是一种框架，可以整合各种NAT穿越技术如STUN、TURN（Traversal Using Relay NAT 中继NAT实现的穿透）。ICE会先使用STUN，尝试建立一个基于UDP的连接，如果失败了，就会去TCP（先尝试HTTP，然后尝试HTTPS），如果依旧失败ICE就会使用一个中继的TURN服务器。

## RTCDataChannel
既然能建立点对点的信道来传递实时的视频,音频数据流.为什么不你能用这个信道传一点其他数据呢?RTCDataChannel就是用来干这个的,基于它我们可以再浏览器之间传输任意数据,DataChannel是建立在PeerConnection上的,不能单独使用

我们可以使用channel = pc.createDataCHannel("someLabel");来在PeerConnection的实例上创建Data Channel，并给与它一个标签
DataChannel使用方式几乎和WebSocket一样，有几个事件：
- onopen
- onclose
- onmessage
- onerror

同时它有几个状态，可以通过readyState获取：
- connecting: 浏览器之间正在试图建立channel
- open：建立成功，可以使用send方法发送数据了
- closing：浏览器正在关闭channel
- closed：channel已经被关闭了
两个暴露的方法:
- close(): 用于关闭channel
- send()：用于通过channel向对方发送数据

### 通过Data Channel发送文件大致思路
JavaScript已经提供了File API从input[type='file']的元素中提取文件，并通过FileReader来将文件的转换成DataURL，这也意味着我们可以将DataURL分成多个碎片来通过Channel来进行文件传输

# 2,信令
## WebRTC的服务器
WebRTC提供了浏览器到浏览器（点对点）之间的通信，但并不意味着WebRTC不需要服务器。暂且不说基于服务器的一些扩展业务，WebRTC至少有两件事必须要用到服务器：
1. 浏览器之间交换建立通信的元数据（信令）必须通过服务器
2. 为了穿越NAT和防火墙
## 为什么需要信令
我们需要通过一系列的信令来建立浏览器之间的通信.而具体需要通过信令交换哪些内容,下面简单的列了一下
1,用来控制通信开启或者关闭的连接控制信息
2,发生错误时用来彼此告知的信息
3,媒体流元数据,比如像解码器,解码器的配置,带宽,媒体类型
4,用来建立安全连接的关键数据
5,外界所看到的网络上的数据,比如IP地址,端口等
在建立连接之前，浏览器之间显然没有办法传递数据。所以我们需要通过服务器的中转，在浏览器之间传递这些数据，然后建立浏览器之间的点对点连接。但是WebRTC API中并没有实现这些。

## 会话描述协议(Session Description Protocol)
JSEP将客户端之前传递的信令分为两种:offer信令和answer信令.他们主要内容的格式都遵循会话描述协议(Session Description Protocol,简称SDP)
是一个在点对点连接中描述自己的字符串.我们可以将其封装在JSON中进行传输,在PeerConnection建立后将通过服务器中转后,将自己的SDP描述符和对方的SDP描述符交给PeerConnection就行了

## 信令与PTCPeerConnection建立

#### 1,通过offer和answer交换SDP描述符
大致上在两个用户（甲和乙）之间建立点对点连接流程应该是这个样子（这里不考虑错误的情况，RTCPeerConnection简称PC）：
1. 甲和乙各自建立一个PC实例
2. 甲通过PC所提供的createOffer()方法建立一个包含甲的SDP描述符的offer信令
3. 甲通过PC所提供的setLocalDescription()方法，将甲的SDP描述符交给甲的PC实例
4. 甲将offer信令通过服务器发送给乙
5. 乙将甲的offer信令中所包含的的SDP描述符提取出来，通过PC所提供的setRemoteDescription()方法交给乙的PC实例
6. 乙通过PC所提供的createAnswer()方法建立一个包含乙的SDP描述符answer信令
7. 乙通过PC所提供的setLocalDescription()方法，将乙的SDP描述符交给乙的PC实例
8. 乙将answer信令通过服务器发送给甲
9. 甲接收到乙的answer信令后，将其中乙的SDP描述符提取出来，调用setRemoteDescripttion()方法交给甲自己的PC实例

甲和乙所创建的PC实例都包含了甲和乙的SDP描述符,接下来--获取连接两端主机的网络地址

#### 2,通过ICE框架建立NAT/防火墙穿越的连接
```js
var iceServer = {
    "iceServers": [{
        "url": "stun:stun.l.google.com:19302"
    }]
};
var pc = new RTCPeerConnection(iceServer);
```
当然这两个地址也需要交换,交换流程如下(RTCPeerConnection简称PC);
1,甲,乙各创建配置了ICE服务器的PC实例,并为其添加`onicecandidate`事件回调
2,当网络候选可用时,将会调用`onicecandidate`函数
3,在回调函数内部,甲或乙将网络候选色消息封装在ICE  Candidate命令中,通过服务器中转,传递给对方
4,甲或乙接收到对方通过服务器中转所发送过来ICE Candidate信令时,将其解析并并获得网络候选,将其通过PC实例的`addIceCandidate()`添加到PC实例中

这样连接就创建完成了,可以向RTCPeerConnection中通过`addStream()`加入流来传输媒体流出具.将流加入到RTCPeerConnection实例中,对方就可以通过`onaddstream`所绑定的回调函数监听到了,调用`addStream()`可以再连接完成之前,在连接建立之后,对方一样能监听到媒体流

### 聊天室中的信令

#### 用户操作
1,打开页面连接到服务器
2,进入聊天室
3,与其他所有已在聊天室的用户建立点对点的连接,输入到页面
4,若有聊天室内其他用户离开,得到通知,关闭与其的连接并移除其在页面中的输出
5,若又有其他用户加入,应得到通知,建立与新加入用户的连接,并输出在页面上
6.离开页面,关闭所有连接

#### 实现思路
以使用WebSocket为例
1,浏览器与服务器建立WebSocket连接
2,发送一个加入聊天室的信令(join),信令中需要包含用户所进入的聊天室名称
3,服务器根据用户所加入的房阿金,发送一个其他用户信令(peers);信令中包含聊天室其他用户的信息,浏览器根据信息来逐个构建与其他用户的点对点连接
4,若有用户离开,服务器发送一个用户离开信令(remove_peer),信令中包含离开的用户的信息,浏览器根据信息关闭与离开用户的信息,并作相应的清除操作
5,若有新用户加入,服务器发送一个用户加入信令(new_peer),信令中包含新加入的用户信息,浏览器根据信息来建立与这个新用户的点对点连接;
6,用户离开页面,关闭WebSocket连接
#### 服务器端实现
由于用户可以只是建立连接，可能还没有进入具体房间，所以首先我们需要一个容器来保存所有用户的连接，同时监听用户是否与服务器建立了WebSocket的连接：
由于有房间的划分，所以我们需要在服务器上建立一个容器，用来保存房间内的用户信息。显然对象较为合适，键为房间名称，值为用户信息列表。

同时我们需要监听上面所说的用户加入房间的信令（join），新用户加入之后需要向新用户发送房间内其他用户信息（peers）和向房间内其他用户发送新用户信息（new_peer），以及用户离开时向其他用户发送离开用户的信息（remove_peer）:



## 参考
- [使用WebRTC搭建前端视频聊天室——入门篇](https://segmentfault.com/a/1190000000436544)
- [使用WebRTC搭建前端视频聊天室——信令篇](https://segmentfault.com/a/1190000000439103)
- [使用WebRTC搭建前端视频聊天室——点对点通信篇](https://segmentfault.com/a/1190000000733774)
- [使用WebRTC搭建前端视频聊天室——数据通道篇](https://segmentfault.com/a/1190000000733779)
- [使用 WebRTC 构建简单的前端视频通讯](https://segmentfault.com/a/1190000005864228)
- [直播和截图](http://ghmagical.com/article/page/id/3sHkVEi4K1JO)
