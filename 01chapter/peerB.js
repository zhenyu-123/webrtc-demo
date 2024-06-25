/*
 * @Description: 
 * @Autor: sy
 * @Date: 2024-06-24 14:19:54
 * @LastEditors: sy
 * @LastEditTime: 2024-06-25 08:54:25
 */
/*
 * @Description: 
 * @Autor: sy
 * @Date: 2024-06-24 14:19:54
 * @LastEditors: sy
 * @LastEditTime: 2024-06-25 08:51:51
 */
//set offer const offer = ...
const offer = {"type":"offer","sdp":"v=0\r\no=- 5536999518452348833 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 63050 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 10.8.0.98\r\na=candidate:3154800574 1 udp 2122260223 10.8.0.98 63050 typ host generation 0 network-id 3 network-cost 50\r\na=candidate:1473497488 1 udp 2122194687 192.168.190.1 63051 typ host generation 0 network-id 1\r\na=candidate:331273650 1 udp 2122129151 192.168.25.1 63052 typ host generation 0 network-id 2\r\na=candidate:1463134339 1 udp 2122063615 192.168.8.35 63053 typ host generation 0 network-id 4\r\na=candidate:3267726630 1 tcp 1518280447 10.8.0.98 9 typ host tcptype active generation 0 network-id 3 network-cost 50\r\na=candidate:689711880 1 tcp 1518214911 192.168.190.1 9 typ host tcptype active generation 0 network-id 1\r\na=candidate:1836136234 1 tcp 1518149375 192.168.25.1 9 typ host tcptype active generation 0 network-id 2\r\na=candidate:704268827 1 tcp 1518083839 192.168.8.35 9 typ host tcptype active generation 0 network-id 4\r\na=ice-ufrag:A8dI\r\na=ice-pwd:AlK+tsZNHg2QPVUGmfc0Km6n\r\na=ice-options:trickle\r\na=fingerprint:sha-256 F2:8A:F4:20:94:54:D3:19:D8:25:C3:4E:01:C6:81:FD:13:48:7F:F3:DC:99:14:1A:C2:58:00:85:B0:01:D0:2F\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
const remoteConnection = new RTCPeerConnection()

remoteConnection.onicecandidate = e =>  {
console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
 console.log(JSON.stringify(remoteConnection.localDescription) )
}

 
remoteConnection.ondatachannel= e => {

      const receiveChannel = e.channel;
      receiveChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
      receiveChannel.onopen = e => console.log("open!!!!");
      receiveChannel.onclose =e => console.log("closed!!!!!!");
      remoteConnection.channel = receiveChannel;

}


remoteConnection.setRemoteDescription(offer).then(a=>console.log("done"))

//create answer
await remoteConnection.createAnswer().then(a => remoteConnection.setLocalDescription(a)).then(a=>
console.log(JSON.stringify(remoteConnection.localDescription)))
//send the anser to the client 