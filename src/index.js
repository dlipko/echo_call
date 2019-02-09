var ua = new SIP.UA('lipko_dima@bmstu.onsip.com');

var session = ua.invite('lipko_dima@bmstu.onsip.com');

var remoteVideo = document.getElementById('remoteVideo');
var localVideo = document.getElementById('localVideo');

session.on('trackAdded', function() {
  // We need to check the peer connection to determine which track was added

  var pc = session.sessionDescriptionHandler.peerConnection;

  // Gets remote tracks
  var remoteStream = new MediaStream();
  pc.getReceivers().forEach(function(receiver) {
    remoteStream.addTrack(receiver.track);
  });
  remoteVideo.srcObject = remoteStream;
  remoteVideo.play();

  // Gets local tracks
  var localStream = new MediaStream();
  pc.getSenders().forEach(function(sender) {
    localStream.addTrack(sender.track);
  });
  localVideo.srcObject = localStream;
  localVideo.play();
});