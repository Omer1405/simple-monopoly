const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let gameSessions = {};

// Handle player connections
io.on('connection', (socket) => {
    console.log('New player connected:', socket.id);

    // Join a game session
    socket.on('joinGame', (sessionId) => {
        socket.join(sessionId);
        console.log(`Player ${socket.id} joined session ${sessionId}`);

        // Initialize game session if it doesn't exist
        if (!gameSessions[sessionId]) {
            gameSessions[sessionId] = { players: [], state: {} };
        }

        gameSessions[sessionId].players.push(socket.id);

        // Notify other players
        socket.to(sessionId).emit('playerJoined', { playerId: socket.id });
    });

    // Handle game state updates
    socket.on('updateGame', (sessionId, newState) => {
        gameSessions[sessionId].state = newState;
        socket.to(sessionId).emit('gameUpdated', newState);
        console.log('Game updated:', newState);
    });

    // Handle player disconnections
    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        // Remove player from game session
        for (const sessionId in gameSessions) {
            gameSessions[sessionId].players = gameSessions[sessionId].players.filter(player => player !== socket.id);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});