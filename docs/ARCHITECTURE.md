# Technical Architecture of Simple Monopoly

## Frontend Structure
- The frontend is built using React, leveraging functional components for UI development.
- Key directories include:
  - `components/`: Reusable components used throughout the app.
  - `hooks/`: Custom hooks for managing state and side effects.
  - `services/`: API calls and Socket.IO client interaction are abstracted here.

## Backend Server Logic
- The backend is powered by Node.js and Express to handle API requests.
- Responsiveness and real-time updates are managed through Socket.IO.
- Key endpoints include:
  - `/api/start-game`: Initializes a new game.
  - `/api/join-game`: Allows players to join an existing game.

## Socket.IO Communication Flow
- The Socket.IO implementation establishes a WebSocket connection between the client and server for real-time interaction.
- Communication events include:
  - `game:start`: Triggered when the game is started.
  - `player:move`: Sent when a player makes a move.
  - `game:update`: Broadcasts game state updates to all connected clients.

## Game State Management
- The game state is maintained on the server and is synchronized with each connected client.
- It includes properties like player positions, properties owned, and game phase (setup, playing, ended).
- The server periodically saves the state to handle disconnection scenarios gracefully.

## AI System
- The AI system utilizes decision trees to simulate player behavior.
- Strategies are encapsulated within the `AI` class, which determines best moves based on the current game state.
- The AI listens to game events and reacts accordingly, providing a challenging experience for human players.

---

This document serves as a high-level overview of the architectural components within the Simple Monopoly project. For detailed implementation, refer to the respective code modules.