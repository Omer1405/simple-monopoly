// AI Player Logic for Simple Monopoly

class AIPlayer {
    constructor(name) {
        this.name = name;
        this.balance = 1500; // Starting balance for Monopoly
    }

    rollDice() {
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        return die1 + die2;
    }

    buyProperty(propertyPrice) {
        if (this.balance >= propertyPrice) {
            this.balance -= propertyPrice;
            return true; // Successfully bought the property
        }
        return false; // Not enough balance
    }

    decideToBuy(propertyPrice, marketStrategy) {
        // Simplified decision logic based on market strategy
        if (marketStrategy === 'aggressive' && this.balance > propertyPrice) {
            return this.buyProperty(propertyPrice);
        } else if (marketStrategy === 'cautious' && propertyPrice < this.balance * 0.5) {
            return this.buyProperty(propertyPrice);
        }
        return false; // Decided not to buy
    }
}

// Example of usage
const aiPlayer = new AIPlayer('AI 1');
console.log(`Rolled Dice: ${aiPlayer.rollDice()}`);
console.log(`Decision to Buy: ${aiPlayer.decideToBuy(300, 'aggressive')}`);
