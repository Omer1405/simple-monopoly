// simple-monopoly Game Logic in JavaScript

// Dice rolling function
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Player class
class Player {
    constructor(name) {
        this.name = name;
        this.position = 0;
        this.money = 1500; // Starting money
        this.properties = [];
    }

    move(steps) {
        this.position = (this.position + steps) % 40; // Assuming a 40-space board
    }

    buyProperty(property) {
        if (this.money >= property.price) {
            this.money -= property.price;
            this.properties.push(property);
            property.owner = this;
        } else {
            console.log(`${this.name} does not have enough money to buy ${property.name}.`);
        }
    }
}

// Property class
class Property {
    constructor(name, price, rent) {
        this.name = name;
        this.price = price;
        this.rent = rent;
        this.owner = null;
    }

    calculateRent() {
        return this.owner ? this.rent : 0;
    }
}

// Game management class
class MonopolyGame {
    constructor(players) {
        this.players = players;
        this.currentPlayerIndex = 0;
    }

    nextTurn() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        const diceRoll = rollDice();
        currentPlayer.move(diceRoll);
        console.log(`${currentPlayer.name} rolled a ${diceRoll} and moved to position ${currentPlayer.position}.`);

        // Logic for property interaction can be added here
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
}

// Example usage:
const player1 = new Player('Alice');
const player2 = new Player('Bob');
const game = new MonopolyGame([player1, player2]);

// Simulating turns
for (let i = 0; i < 10; i++) {
    game.nextTurn();
}