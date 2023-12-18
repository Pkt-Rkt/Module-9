const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const users = {};

io.on('connection', (socket) => {
  // Broadcast a message to connected users when someone connects
  socket.on('new-user', (nickname) => {
    users[socket.id] = nickname;
    io.emit('user-connected', `${nickname} has joined the chat`);
    io.emit('update-online-users', Object.values(users));
  });

  // Don't send the same message to the user that sent it
  socket.on('chat-message', (message) => {
    socket.broadcast.emit('chat-message', {
      message: message,
      nickname: users[socket.id],
    });
  });

  // Add "user is typing" functionality
  socket.on('typing', () => {
    socket.broadcast.emit('typing', users[socket.id]);
  });

  // Broadcast a message to connected users when someone disconnects
  socket.on('disconnect', () => {
    const disconnectedUser = users[socket.id];
    delete users[socket.id];
    io.emit('user-disconnected', `${disconnectedUser} has left the chat`);
    io.emit('update-online-users', Object.values(users));
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

//http://localhost:3000