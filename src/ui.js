class UI {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.players = [];
        this.dice = [1, 1];
        this.currentTurn = 0;
        this.boardFields = this.createBoardFields();
        this.render();
    }

    createBoardFields() {
        const fields = [];
        for (let i = 0; i < 40; i++) {
            fields.push({ id: i, x: /* calculate x */, y: /* calculate y */, name: `Field ${i + 1}` });
        }
        return fields;
   }

    addPlayer(tokenColor) {
        this.players.push({ color: tokenColor, position: 0 });
        this.renderPlayer({ color: tokenColor, position: 0 });
    }

    updatePlayerInfo(playerIndex, newPosition) {
        this.players[playerIndex].position = newPosition;
        this.render();
    }

    rollDice() {
        this.dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        this.updateDiceDisplay();
        this.nextTurn();
    }

    updateDiceDisplay() {
        // Display dice values
    }

    showMessage(message) {
        // Show messages on UI
    }

    render() {
        this.clearCanvas();
        this.drawBoard();
        this.renderPlayers();
        this.renderDice();
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBoard() {
        // Draw each field on the board
        this.boardFields.forEach(field => {
            // Render field at field.x, field.y
        });
        this.drawCenterText();
    }

    drawCenterText() {
        this.context.fillText('MONOPOLY', this.canvas.width / 2, this.canvas.height / 2);
    }

    renderPlayers() {
        this.players.forEach((player, index) => {
            const pos = this.calculatePlayerPosition(player.position);
            this.context.fillStyle = player.color;
            this.context.beginPath();
            this.context.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
            this.context.fill();
        });
    }

    calculatePlayerPosition(position) {
        // Calculate based on position on board
        return { x: /* x position */, y: /* y position */ };
    }

    nextTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }

    renderDice() {
        // Render dice on UI
    }

    manageButtonStates() {
        // Enable or disable buttons based on game state
    }
}