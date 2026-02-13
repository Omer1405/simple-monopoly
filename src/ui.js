class UI {
    constructor() {
        this.board = [];
        this.message = '';
    }

    init() {
        // Initialize the UI components
        this.drawBoard();
    }

    drawBoard() {
        // Logic for drawing the game board
        console.log('Drawing the game board');
        // Additional logic here
    }

    showMessage(msg) {
        this.message = msg;
        console.log(this.message);
    }
}

export default UI;