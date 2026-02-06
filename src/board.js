// Board layout for Monopoly

const board = [
    { type: 'property', name: 'Go', rent: 0 },
    { type: 'property', name: 'Mediterranean Avenue', rent: 2 },
    { type: 'railroad', name: 'Reading Railroad', rent: 25 },
    { type: 'property', name: 'Baltic Avenue', rent: 4 },
    { type: 'special', name: 'Income Tax', amount: 200 },
    { type: 'property', name: 'Oriental Avenue', rent: 6 },
    { type: 'property', name: 'Vermont Avenue', rent: 6 },
    { type: 'property', name: 'Connecticut Avenue', rent: 8 },
    { type: 'railroad', name: 'Pennsylvania Railroad', rent: 25 },
    { type: 'property', name: 'St. Charles Place', rent: 10 },
    { type: 'utility', name: 'Electric Company', rent: '4 or 10' },
    { type: 'property', name: 'States Avenue', rent: 12 },
    { type: 'property', name: 'Virginia Avenue', rent: 12 },
    { type: 'railroad', name: 'B&O Railroad', rent: 25 },
    { type: 'property', name: 'Marvin Gardens', rent: 14 },
    { type: 'special', name: 'Go to Jail' },
    { type: 'property', name: 'Atlantic Avenue', rent: 16 },
    { type: 'property', name: 'Ventnor Avenue', rent: 16 },
    { type: 'utility', name: 'Water Works', rent: '4 or 10' },
    { type: 'railroad', name: 'Short Line', rent: 25 },
    { type: 'property', name: 'Park Place', rent: 20 },
    { type: 'special', name: 'Luxury Tax', amount: 100 },
    { type: 'property', name: 'Boardwalk', rent: 50 }
];

function getField(index) {
    return board[index];
}

function getRent(fieldIndex) {
    return board[fieldIndex].rent;
}

function getSpecialFields() {
    return board.filter(field => field.type === 'special');
}

// Example usage:
console.log(getField(0)); // { type: 'property', name: 'Go', rent: 0 }
console.log(getRent(1)); // 2
console.log(getSpecialFields());
