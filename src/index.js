var config = {
  // Replace this IP address with your Asterisk IP address
  uri: '1060@127.0.0.1',

  // Replace this IP address with your Asterisk IP address,
  // and replace the port with your Asterisk port from the http.conf file
  ws_servers: 'wss://127.0.0.1:8089/ws',

  // Replace this with the username from your sip.conf file
  authorizationUser: '1060',

  // Replace this with the password from your sip.conf file
  password: 'password',
};

var ua = new SIP.UA(config);

// Invite with audio only
var session = ua.invite('1061',{
  sessionDescriptionHandlerOptions: {
    constraints: {
      audio: true,
      video: false
    }
  }
});


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