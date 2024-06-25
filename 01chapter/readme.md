打开两个浏览器
在两者上打开DevTools
在第一个浏览器开发工具中粘贴peerA.js内容
复制SDP报价生成的JSON
到达第二个浏览器，创建“offer”对象，并将其设置为您复制的SDP（签名）
在第二个浏览器开发工具中粘贴peerB.js内容
返回第一浏览器（peerA），粘贴peerA_Final.js的内容
使用sendChannel.send('hello,我是A')从peerA发送数据
使用 remoteConnection.channel.send("hi,我是B")从peerB发送数据


 