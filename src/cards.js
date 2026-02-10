// Ereignis- und Gemeinschaftskarten für Monopoly

export const chanceCards = [
  { id: 1, text: "Rücken Sie vor bis zur Schlossallee", action: "moveTo", target: 39 },
  { id: 2, text: "Rücken Sie vor bis Los", action: "moveTo", target: 0 },
  { id: 3, text: "Rücken Sie vor bis zur Seestraße", action: "moveTo", target: 11 },
  { id: 4, text: "Gehen Sie in das Gefängnis", action: "goToJail" },
  { id: 5, text: "Sie haben eine Gemeinschaftsaufgabe beendet. Sie erhalten 50€", action: "money", amount: 50 },
  { id: 6, text: "Zahlen Sie 15€ Steuern", action: "money", amount: -15 },
  { id: 7, text: "Ihre Autoversicherung zahlt Ihnen 100€", action: "money", amount: 100 },
  { id: 8, text: "Gehen Sie zurück um 3 Felder", action: "moveBack", steps: 3 },
  { id: 9, text: "Rücken Sie vor bis zum nächsten Bahnhof", action: "moveToNextRailroad" },
  { id: 10, text: "Rücken Sie vor bis zum nächsten Bahnhof", action: "moveToNextRailroad" },
  { id: 11, text: "Rücken Sie vor bis zum nächsten Versorgungswerk", action: "moveToNextUtility" },
  { id: 12, text: "Die Bank zahlt Ihnen eine Dividende von 50€", action: "money", amount: 50 },
  { id: 13, text: "Zahlen Sie für jedes Haus 25€ und für jedes Hotel 100€", action: "propertyTax", house: 25, hotel: 100 },
  { id: 14, text: "Sie kommen aus dem Gefängnis frei", action: "getOutOfJailFree" },
  { id: 15, text: "Rücken Sie vor bis zur nächsten Straße", action: "moveToNextProperty" },
  { id: 16, text: "Zahlen Sie jedem Mitspieler 50€", action: "payAllPlayers", amount: 50 }
];

export const communityChestCards = [
  { id: 1, text: "Rücken Sie vor bis Los", action: "moveTo", target: 0 },
  { id: 2, text: "Sie erben 100€", action: "money", amount: 100 },
  { id: 3, text: "Sie haben eine Wette gewonnen und erhalten 10€", action: "money", amount: 10 },
  { id: 4, text: "Einkommensteuer-Rückerstattung. Sie erhalten 20€", action: "money", amount: 20 },
  { id: 5, text: "Arztkosten. Zahlen Sie 50€", action: "money", amount: -50 },
  { id: 6, text: "Gehen Sie in das Gefängnis", action: "goToJail" },
  { id: 7, text: "Sie verkaufen Aktien und erhalten 50€", action: "money", amount: 50 },
  { id: 8, text: "Sie haben Geburtstag. Jeder Mitspieler zahlt Ihnen 10€", action: "collectFromAllPlayers", amount: 10 },
  { id: 9, text: "Zahlen Sie eine Krankenhausgebühr von 100€", action: "money", amount: -100 },
  { id: 10, text: "Zahlen Sie Ihre Versicherungsprämie von 50€", action: "money", amount: -50 },
  { id: 11, text: "Sie kommen aus dem Gefängnis frei", action: "getOutOfJailFree" },
  { id: 12, text: "Sie gewinnen im Schönheitswettbewerb und erhalten 10€", action: "money", amount: 10 },
  { id: 13, text: "Zahlen Sie die Schulgebühren von 50€", action: "money", amount: -50 },
  { id: 14, text: "Sie erben 100€", action: "money", amount: 100 },
  { id: 15, text: "Aus dem Verkauf Ihrer Aktien erhalten Sie 50€", action: "money", amount: 50 },
  { id: 16, text: "Zahlen Sie für Straßenausbesserungen: 40€ pro Haus, 115€ pro Hotel", action: "propertyTax", house: 40, hotel: 115 }
];

export function shuffleCards(cards) {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export class CardDeck {
  constructor(cards) {
    this.cards = shuffleCards(cards);
    this.currentIndex = 0;
    this.getOutOfJailFreeCards = 0;
  }

  drawCard() {
    if (this.currentIndex >= this.cards.length) {
      this.currentIndex = 0;
      this.cards = shuffleCards(this.cards);
    }
    
    const card = this.cards[this.currentIndex];
    this.currentIndex++;
    
    if (card.action === 'getOutOfJailFree') {
      this.getOutOfJailFreeCards++;
    }
    
    return card;
  }

  returnGetOutOfJailCard() {
    this.getOutOfJailFreeCards--;
  }
}

export default {
  chanceCards,
  communityChestCards,
  shuffleCards,
  CardDeck
};