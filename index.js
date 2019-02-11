const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/src/index.html" );
});

app.use('/', express.static(__dirname + '/src'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});