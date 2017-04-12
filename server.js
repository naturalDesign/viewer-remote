'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var apiai = require('apiai');
var appAI = apiai("701b304aadd544eb80d85df31fdb8427");
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'img')));


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Webhook for api.ai
app.post('/hook', function (req, res) {
  io.emit('Forge JS', req.body.result.fulfillment.messages[0].speech);
  console.log(req.body.result.fulfillment.messages[0].speech);
});

io.on('connection', function (socket) {
  console.log('a user connected');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
  });
});

// io.on('connection', function (socket) {
//   socket.broadcast.emit('hi');
// });

// io.on('connection', function (socket) {
//   socket.on('chat message', function (msg) {
//     io.emit('chat message', msg);
//   });
// });

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    var request = appAI.textRequest(msg, {
      sessionId: 'uid'
    });

    // request.on('response', function (response) {
    //   io.emit('Forge JS', response.result.fulfillment.messages[0].speech);
    //   console.log(response.result.fulfillment.messages[0].speech);
    // });

    request.on('error', function (error) {
      console.log(error);
    });

    request.end();
  });
});

http.listen(process.env.PORT, process.env.IP, function () {
  console.log('listening on *:' + process.env.PORT + ':' + process.env.IP);
});
