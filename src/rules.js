/*
Monopoly Game Rules
*/

// Property Purchase
class Property {
    constructor(name, price, rent) {
        this.name = name;
        this.price = price;
        this.rent = rent;
        this.owner = null;
    }

    purchase(player) {
        if(this.owner === null) {
            this.owner = player;
            player.cash -= this.price;
            console.log(`${player.name} purchased ${this.name} for $${this.price}`);
        } else {
            console.log(`${this.name} is already owned by ${this.owner.name}`);
        }
    }
}

// Rent Calculation
function payRent(property, player) {
    if(property.owner && property.owner !== player) {
        player.cash -= property.rent;
        property.owner.cash += property.rent;
        console.log(`${player.name} paid $${property.rent} rent to ${property.owner.name}`);
    }
}

// Turn Management
class Game {
    constructor(players) {
        this.players = players;
        this.currentPlayerIndex = 0;
    }

    nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        console.log(`It's now ${this.players[this.currentPlayerIndex].name}'s turn`);
    }
}

// Sample Usage (Remove when implementing)
let player1 = {name: 'Alice', cash: 1500};
let player2 = {name: 'Bob', cash: 1500};
let property = new Property('Park Place', 350, 50);

property.purchase(player1);
payRent(property, player2);

let game = new Game([player1, player2]);
game.nextTurn();