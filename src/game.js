import { Player } from './player.js';
import { monopolyBoard, boardSize, getFieldById } from './board.js';
import { MonopolyRules } from './rules.js';
import { chanceCards, communityChestCards, CardDeck } from './cards.js';

export class MonopolyGame {
    constructor(playerNames, gameMode = 'offline') {
        this.players = playerNames.map((name, idx) => new Player(idx, name, this.getPlayerColor(idx)) );
        this.currentPlayerIndex = 0;
        this.gameMode = gameMode;
        this.gameState = 'playing';
        this.board = monopolyBoard;
        this.diceRoll = 0;
        this.lastDiceRoll = { die1: 0, die2: 0 };
        this.doubleRolled = false;
        this.doublesCount = 0;
        this.turnPhase = 'roll';
        this.chanceDeck = new CardDeck(chanceCards);
        this.communityDeck = new CardDeck(communityChestCards);
        this.players.forEach(player => {
            player.money = MonopolyRules.STARTING_MONEY;
        });
    }

    getPlayerColor(index) {
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        return colors[index % colors.length];
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    rollDice() {
        if (this.turnPhase !== 'roll') {
            return { error: 'Cannot roll dice now' };
        }
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        this.diceRoll = die1 + die2;
        this.lastDiceRoll = { die1, die2 };
        this.doubleRolled = die1 === die2;
        if (this.doubleRolled) {
            this.doublesCount++;
            if (this.doublesCount >= 3) {
                this.sendToJail(this.getCurrentPlayer());
                return { die1, die2, total: this.diceRoll, isDouble: true, message: 'Drei Paschs! Ab ins Gefängnis!' };
            }
        } else {
            this.doublesCount = 0;
        }
        this.turnPhase = 'move';
        return { die1, die2, total: this.diceRoll, isDouble: this.doubleRolled };
    }

    movePlayer() {
        if (this.turnPhase !== 'move') {
            return { error: 'Cannot move now' };
        }
        const player = this.getCurrentPlayer();
        const oldPosition = player.position;
        const boardLength = boardSize();
        player.position = (player.position + this.diceRoll) % boardLength;
        if (player.position < oldPosition) {
            player.money += MonopolyRules.GO_REWARD;
        }
        this.turnPhase = 'action';
        const landResult = this.landOnField();
        return { playerName: player.name, oldPosition, newPosition: player.position, field: this.board[player.position], landResult };
    }

    landOnField() {
        const player = this.getCurrentPlayer();
        const field = this.board[player.position];
        switch(field.type) {
            case 'property':
            case 'railroad':
            case 'utility':
                return this.handlePropertyField(field, player);
            case 'chance':
                return this.handleChanceField();
            case 'community':
                return this.handleCommunityField();
            case 'tax':
                return this.handleTaxField(field, player);
            case 'corner':
                return this.handleCornerField(field, player);
            default:
                this.turnPhase = 'endTurn';
                return { action: 'none' };
        }
    }

    handlePropertyField(field, player) {
        if (!field.owner) {
            if (MonopolyRules.canBuyProperty(player, field)) {
                this.turnPhase = 'buyProperty';
                return { action: 'canBuy', field, price: field.price };
            } else {
                this.turnPhase = 'endTurn';
                return { action: 'cannotAfford', field };
            }
        } else if (field.owner !== player.id) {
            const owner = this.players.find(p => p.id === field.owner);
            const rent = MonopolyRules.calculateRent(field, this.diceRoll, owner);
            player.money -= rent;
            owner.money += rent;
            this.turnPhase = 'endTurn';
            return { action: 'payRent', rent, ownerName: owner.name, field };
        } else {
            this.turnPhase = 'endTurn';
            return { action: 'ownProperty', field };
        }
    }

    handleChanceField() {
        const card = this.chanceDeck.drawCard();
        this.executeCard(card);
        this.turnPhase = 'endTurn';
        return { action: 'chance', card };
    }

    handleCommunityField() {
        const card = this.communityDeck.drawCard();
        this.executeCard(card);
        this.turnPhase = 'endTurn';
        return { action: 'community', card };
    }

    executeCard(card) {
        const player = this.getCurrentPlayer();
        switch(card.action) {
            case 'money':
                player.money += card.amount;
                break;
            case 'moveTo':
                const oldPos = player.position;
                player.position = card.target;
                if (card.target < oldPos) {
                    player.money += MonopolyRules.GO_REWARD;
                }
                break;
            case 'moveBack':
                player.position = Math.max(0, player.position - card.steps);
                break;
            case 'goToJail':
                this.sendToJail(player);
                break;
            case 'getOutOfJailFree':
                player.getOutOfJailCards++;
                break;
            case 'payAllPlayers':
                this.players.forEach(p => {
                    if (p.id !== player.id) {
                        player.money -= card.amount;
                        p.money += card.amount;
                    }
                });
                break;
            case 'collectFromAllPlayers':
                this.players.forEach(p => {
                    if (p.id !== player.id) {
                        p.money -= card.amount;
                        player.money += card.amount;
                    }
                });
                break;
            case 'propertyTax':
                const tax = this.calculatePropertyTax(player, card.house, card.hotel);
                player.money -= tax;
                break;
            case 'moveToNextRailroad':
                player.position = this.findNextFieldOfType(player.position, 'railroad');
                break;
            case 'moveToNextUtility':
                player.position = this.findNextFieldOfType(player.position, 'utility');
                break;
        }
    }

    findNextFieldOfType(currentPosition, type) {
        for (let i = 1; i < boardSize(); i++) {
            const nextPos = (currentPosition + i) % boardSize();
            if (this.board[nextPos].type === type) {
                return nextPos;
            }
        }
        return currentPosition;
    }

    calculatePropertyTax(player, houseRate, hotelRate) {
        let tax = 0;
        player.properties.forEach(propId => {
            const field = this.board[propId];
            if (field.houses) {
                tax += field.houses * houseRate;
            }
            if (field.hotels) {
                tax += field.hotels * hotelRate;
            }
        });
        return tax;
    }

    handleTaxField(field, player) {
        player.money -= field.taxAmount;
        this.turnPhase = 'endTurn';
        return { action: 'payTax', amount: field.taxAmount, field };
    }

    handleCornerField(field, player) {
        switch(field.id) {
            case 0:
                this.turnPhase = 'endTurn';
                return { action: 'onGo' };
            case 10:
                this.turnPhase = 'endTurn';
                return { action: 'justVisiting' };
            case 20:
                this.turnPhase = 'endTurn';
                return { action: 'freeParking' };
            case 30:
                this.sendToJail(player);
                return { action: 'goToJail' };
            default:
                this.turnPhase = 'endTurn';
                return { action: 'none' };
        }
    }

    sendToJail(player) {
        player.position = 10;
        player.inJail = true;
        player.jailTurns = 0;
        this.turnPhase = 'endTurn';
    }

    buyProperty() {
        if (this.turnPhase !== 'buyProperty') {
            return { success: false, message: 'Cannot buy now' };
        }
        const player = this.getCurrentPlayer();
        const field = this.board[player.position];
        if (MonopolyRules.canBuyProperty(player, field)) {
            player.money -= field.price;
            field.owner = player.id;
            player.properties.push(field.id);
            this.turnPhase = 'endTurn';
            return { success: true, message: `${player.name} hat ${field.name} für ${field.price}€ gekauft!`, field };
        } else {
            return { success: false, message: 'Nicht genug Geld!' };
        }
    }

    skipBuy() {
        if (this.turnPhase === 'buyProperty') {
            this.turnPhase = 'endTurn';
            return { success: true };
        }
        return { success: false };
    }

    endTurn() {
        const player = this.getCurrentPlayer();
        if (MonopolyRules.isBankrupt(player)) {
            this.eliminatePlayer(player.id);
        }
        if (this.doubleRolled && !player.inJail && this.doublesCount < 3) {
            this.turnPhase = 'roll';
            return { nextPlayer: this.getCurrentPlayer().name, rollAgain: true };
        }
        this.doublesCount = 0;
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.turnPhase = 'roll';
        if (this.players.length === 1) {
            this.gameState = 'ended';
            return { gameOver: true, winner: this.players[0].name };
        }
        return { nextPlayer: this.getCurrentPlayer().name };
    }

    eliminatePlayer(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            player.properties.forEach(propId => {
                const field = this.board[propId];
                field.owner = null;
                field.houses = 0;
                field.hotels = 0;
            });
            this.players = this.players.filter(p => p.id !== playerId);
        }
    }

    getGameState() {
        return { 
            players: this.players.map(p => ({ 
                id: p.id, 
                name: p.name, 
                position: p.position, 
                money: p.money, 
                properties: p.properties, 
                inJail: p.inJail, 
                color: p.color 
            })),
            currentPlayer: this.currentPlayerIndex,
            turnPhase: this.turnPhase,
            gameState: this.gameState,
            lastDiceRoll: this.lastDiceRoll,
            board: this.board
        };
    }
}

export default MonopolyGame;