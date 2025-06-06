const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let userNum = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

io.on('connection', (socket) => {
  userNum++;
  socket.username = "User " + userNum;
  console.log(socket.username + ' connected');
  socket.emit('set username', socket.username);
  socket.on('disconnect', () => {
    console.log(socket.username + ' disconnected');
  });
});

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', getTime() + " " + socket.username + ": " + msg);
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing');
    console.log("typing now");
  });
  
  socket.on('not typing', () => {
    io.emit('not typing');
    console.log("not typing anymore");
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// Helper function to get the current date and time
function getTime() {
  const now = new Date();

  var date = (now.getMonth() + 1) + "/" + now.getDate() + "/" + now.getFullYear();
  var hour = now.getHours();
  var zone = "am";
  if (hour > 12) {
    hour -= 12;
    zone = "pm"
  }
  var minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var time = hour + ":" + minutes + zone;
  return "(" + date.toString() + ", " + time.toString() + ")";
}