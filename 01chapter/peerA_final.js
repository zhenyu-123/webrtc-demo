/*
 * @Description: 
 * @Autor: sy
 * @Date: 2024-06-24 14:17:35
 * @LastEditors: sy
 * @LastEditTime: 2024-06-25 08:52:29
 */

//this opens the connection
const answer ={"type":"answer","sdp":"v=0\r\no=- 1285950431748705666 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:2631012895 1 udp 2113937151 40c5f9bf-d145-4755-b1f3-7a8e57ad1f3e.local 61977 typ host generation 0 network-cost 999\r\na=ice-ufrag:HR9r\r\na=ice-pwd:cMzcsqnX8wWYFojAJFzzwHhw\r\na=ice-options:trickle\r\na=fingerprint:sha-256 95:B8:13:EF:0B:85:0C:59:63:9D:57:97:67:6F:E8:60:A7:85:5B:0C:09:0B:47:02:64:91:5A:40:08:33:74:8E\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}
localConnection.setRemoteDescription (answer).then(a=>console.log("done"))