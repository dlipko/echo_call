// var options = {
//   media: {
//     local: {
//       video: document.getElementById('localVideo')
//     },
//     remote: {
//       video: document.getElementById('remoteVideo'),
//       // This is necessary to do an audio/video call as opposed to just a video call
//       audio: document.getElementById('remoteVideo')
//     }
//   },
//   ua: {
//     uri: 'lipko_dima@bmstu.onsip.com',
//      authorizationUser: 'lipko_dima',
//     password: 'PoudHzAh5DLAtdKW',
//   }
// };
// var simple = new SIP.Web.Simple(options);



var config = {
  // Replace this IP address with your Asterisk IP address
  uri: 'lipko_dima@bmstu.onsip.com',

  // Replace this IP address with your Asterisk IP address,
  // and replace the port with your Asterisk port from the http.conf file
  ws_servers: 'ws://lipko_dima@bmstu.onsip.com/ws',

  // Replace this with the username from your sip.conf file
  authorizationUser: 'lipko_dima',

  // Replace this with the password from your sip.conf file
  password: 'PoudHzAh5DLAtdKW',
};


var remoteVideo = document.getElementById('remoteVideo');
var localVideo = document.getElementById('localVideo');

var ua = new SIP.UA(config);

ua.on('trackAdded', function() {
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


// Invite with audio only
ua.invite('lipko_dima',{
  sessionDescriptionHandlerOptions: {
    constraints: {
      audio: true,
      video: false
    }
  }
});

// simple.on('ringing', function() {
//   simple.answer();
// });

// simple.call('lipko_dima@bmstu.onsip.com');