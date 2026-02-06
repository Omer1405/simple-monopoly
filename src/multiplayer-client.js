// src/multiplayer-client.js

// Import the Socket.IO client
import { io } from 'socket.io-client';

// Connect to the server
const socket = io('http://your-server-url'); // replace with your server URL

// Emit game events
function emitGameEvent(event, data) {
    socket.emit(event, data);
}

// Listen for game state updates
socket.on('gameStateUpdate', (gameState) => {
    console.log('Game state updated:', gameState);
    // Update your game state logic here
});

// Example: Emit a start game event
emitGameEvent('startGame', { gameId: '12345' });
