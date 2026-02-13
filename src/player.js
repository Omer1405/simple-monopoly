class Player {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.balance = 1500; // Starting money
        this.properties = [];
        this.isInJail = false;
    }

    move(steps) {
        // Logic for moving the player on the board
    }

    receiveMoney(amount) {
        this.balance += amount;
    }

    payMoney(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
        } else {
            this.isBankrupt();
        }
    }

    buyProperty(property) {
        this.receiveMoney(-property.price);
        this.properties.push(property);
    }

    payRent(rent) {
        this.payMoney(rent);
    }

    receiveRent(rent) {
        this.receiveMoney(rent);
    }

    mortgage(property) {
        // Logic for mortgaging a property
    }

    isBankrupt() {
        // Logic for declaring bankruptcy
        console.log(`${this.name} is bankrupt!`);
    }

    // Jail-related methods
    goToJail() {
        this.isInJail = true;
    }

    getOutOfJail() {
        this.isInJail = false;
    }

    // Building methods
    buildHouse(property) {
        // Logic for building a house
    }

    buildHotel(property) {
        // Logic for building a hotel
    }
}