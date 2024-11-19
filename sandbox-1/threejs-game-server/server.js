// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Player state management
let players = {};

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Initialize player position
  players[socket.id] = { x: 0, y: 1, z: 0 };
  io.emit('playerPosition', Object.values(players)); // Send initial position

  // Handle player movement
  socket.on('movePlayer', (movement) => {
    const player = players[socket.id];
    if (!player) return;

    // Update position based on movement
    player.x += movement.dx;
    player.z += movement.dz;

    io.emit('playerPosition', Object.values(players)); // Broadcast all positions
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit('playerPosition', Object.values(players)); // Update all clients
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
