"use strict";

var localVideo = document.querySelector("video#localvideo");
var remoteVideo = document.querySelector("video#remotevideo");

var btnStart = document.querySelector("button#start");
var btnCall = document.querySelector("button#call");
var btnHangup = document.querySelector("button#hangup");

var offerSdpTextarea = document.querySelector("textarea#offer");
var answerSdpTextarea = document.querySelector("textarea#answer");

var localStream;
var pc1;
var pc2;

function getMediaStream(stream) {
  localVideo.srcObject = stream;
  localStream = stream;
}

function handleError(err) {
  console.error("Failed to get Media Stream!", err);
}

function start() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error("the getUserMedia is not supported!");
    return;
  } else {
    var constraints = {
      video: true,
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(getMediaStream)
      .catch(handleError);

    btnStart.disabled = true;
    btnCall.disabled = false;
    btnHangup.disabled = true;
  }
}

function getRemoteStream(e) {
  remoteVideo.srcObject = e.streams[0];
}

function handleOfferError(err) {
  console.error("Failed to create offer:", err);
}

function handleAnswerError(err) {
  console.error("Failed to create answer:", err);
}

function getAnswer(desc) {
  pc2.setLocalDescription(desc);
  answerSdpTextarea.value = desc.sdp;

  //send desc to signal
  //receive desc from signal

  pc1.setRemoteDescription(desc);
}
// 连接本地端的描述被设置为应答的 SDP，则通过信令服务器将应答发送给调用者，让他们知道应答是什么。
function getOffer(desc) {
  console.log(desc, "desc");
  pc1.setLocalDescription(desc);
  offerSdpTextarea.value = desc.sdp;

  //send desc to signal
  //receive desc from signal
  // 将把接收到的请求建立为连接的远程（调用方）端的描述。
  pc2.setRemoteDescription(desc);
  //  创建了应答
  pc2.createAnswer().then(getAnswer).catch(handleAnswerError);
}

function call() {
  pc1 = new RTCPeerConnection();
  pc2 = new RTCPeerConnection();

  // 没有候选人加入到ICE候选地址
  pc1.onicecandidate = (e) => {
    pc2.addIceCandidate(e.candidate);
  };
  // 没有候选人加入到ICE候选地址
  pc2.onicecandidate = (e) => {
    pc1.addIceCandidate(e.candidate);
  };
  // 当向连接中添加磁道时，track 事件的此处理程序由本地 WebRTC 层调用。例如，可以将传入媒体连接到元素以显示它。
  pc2.ontrack = getRemoteStream;
  // 获取流的磁道数组。
  // 然后遍历流中的磁道，调用 addTrack() 将每个磁道添加到 RTCPeerConnection。尽管连接尚未完全建立，但必须尽快开始向其发送媒体数据，因为媒体数据将帮助 ICE 层决定采取的最佳连接方式，这有助于协商过程。
  localStream.getTracks().forEach((track) => {
    pc1.addTrack(track, localStream);
  });

  var offerOptions = {
    offerToRecieveAudio: 0,
    offerToRecieveVideo: 1,
  };
  // 送到呼叫另一端的视频
  // 当 createOffer() 成功（执行 promise）时，我们将创建的请求信息传递到myPeerConnection.setLocalDescription() ，它为调用方的连接端配置连接和媒体配置状态。
  pc1.createOffer(offerOptions).then(getOffer).catch(handleOfferError);

  btnCall.disabled = true;
  btnHangup.disabled = false;
}

function hangup() {
  pc1.close();
  pc2.close();
  pc1 = null;
  pc2 = null;

  btnCall.disabled = false;
  btnHangup.disabled = true;
}

btnStart.onclick = start;
btnCall.onclick = call;
btnHangup.onclick = hangup;
