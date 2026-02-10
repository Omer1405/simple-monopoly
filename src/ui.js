// ui.js - User Interface for Simple Monopoly

class UI {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.boardSize = 600;
        this.fieldSize = 100;
    }

    init() {
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        this.canvas.width = this.boardSize;
        this.canvas.height = this.boardSize;
        this.drawBoard();
    }

    drawBoard() {
        if (!this.ctx) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.boardSize, this.boardSize);
        
        // Draw board background
        this.ctx.fillStyle = '#e8f5e9';
        this.ctx.fillRect(0, 0, this.boardSize, this.boardSize);
        
        // Draw board outline
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(0, 0, this.boardSize, this.boardSize);
        
        // Draw fields (simplified 20 field board)
        this.drawFields();
    }

    drawFields() {
        const fieldsPerSide = 5;
        const fieldWidth = this.boardSize / fieldsPerSide;
        const fieldHeight = 80;

        // Bottom row (left to right)
        for (let i = 0; i < fieldsPerSide; i++) {
            this.drawField(i * fieldWidth, this.boardSize - fieldHeight, fieldWidth, fieldHeight, i);
        }

        // Right column (bottom to top)
        for (let i = 0; i < fieldsPerSide - 1; i++) {
            this.drawField(this.boardSize - fieldHeight, this.boardSize - fieldHeight - (i + 1) * fieldWidth, fieldHeight, fieldWidth, i + 5);
        }

        // Top row (right to left)
        for (let i = 0; i < fieldsPerSide - 1; i++) {
            this.drawField(this.boardSize - fieldHeight - (i + 1) * fieldWidth, 0, fieldWidth, fieldHeight, i + 9);
        }

        // Left column (top to bottom)
        for (let i = 0; i < fieldsPerSide - 1; i++) {
            this.drawField(0, (i + 1) * fieldWidth, fieldHeight, fieldWidth, i + 13);
        }

        // Center area
        this.ctx.fillStyle = '#fff9c4';
        this.ctx.fillRect(fieldHeight, fieldHeight, this.boardSize - 2 * fieldHeight, this.boardSize - 2 * fieldHeight);
        this.ctx.strokeRect(fieldHeight, fieldHeight, this.boardSize - 2 * fieldHeight, this.boardSize - 2 * fieldHeight);
        
        this.ctx.fillStyle = '#000';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('MONOPOLY', this.boardSize / 2, this.boardSize / 2);
    }

    drawField(x, y, width, height, index) {
        // Field background
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(x, y, width, height);
        
        // Field border
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, width, height);
        
        // Field number
        this.ctx.fillStyle = '#000';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`#${index}`, x + width / 2, y + height / 2);
    }

    drawPlayer(playerPosition, playerColor, playerIndex) {
        if (!this.ctx) return;
        
        const position = this.getFieldPosition(playerPosition);
        const offsetX = (playerIndex % 2) * 15;
        const offsetY = Math.floor(playerIndex / 2) * 15;
        
        this.ctx.fillStyle = playerColor;
        this.ctx.beginPath();
        this.ctx.arc(position.x + offsetX, position.y + offsetY, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    getFieldPosition(index) {
        const fieldsPerSide = 5;
        const fieldWidth = this.boardSize / fieldsPerSide;
        const fieldHeight = 80;
        
        // Bottom row
        if (index < fieldsPerSide) {
            return { x: index * fieldWidth + fieldWidth / 2, y: this.boardSize - fieldHeight / 2 };
        }
        // Right column
        else if (index < 2 * fieldsPerSide - 1) {
            const i = index - fieldsPerSide;
            return { x: this.boardSize - fieldHeight / 2, y: this.boardSize - fieldHeight - (i + 1) * fieldWidth + fieldWidth / 2 };
        }
        // Top row
        else if (index < 3 * fieldsPerSide - 2) {
            const i = index - (2 * fieldsPerSide - 1);
            return { x: this.boardSize - fieldHeight - (i + 1) * fieldWidth + fieldWidth / 2, y: fieldHeight / 2 };
        }
        // Left column
        else {
            const i = index - (3 * fieldsPerSide - 2);
            return { x: fieldHeight / 2, y: (i + 1) * fieldWidth + fieldWidth / 2 };
        }
    }

    updatePlayerInfo(players, currentPlayerIndex) {
        const infoDiv = document.getElementById('player-info');
        if (!infoDiv) return;
        
        let html = '<h3>Players</h3>'; 
        players.forEach((player, index) => {
            const isCurrent = index === currentPlayerIndex;
            html += `
                <div class="player ${isCurrent ? 'current' : ''}">
                    <span style="color: ${player.color}">●</span>
                    <strong>${player.name}</strong>: $${player.money}
                    (Position: ${player.position})
                </div>
            `;
        });
        infoDiv.innerHTML = html;
    }

    showMessage(message) {
        const messageDiv = document.getElementById('game-message');
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.style.display = 'block';
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        }
    }

    renderGame(gameState) {
        this.drawBoard();
        gameState.players.forEach((player, index) => {
            this.drawPlayer(player.position, player.color, index);
        });
        this.updatePlayerInfo(gameState.players, gameState.currentPlayer);
    }
}

export default UI;