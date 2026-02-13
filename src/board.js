const monopolyBoard = [
  // Bottom row (0-10)
  { id: 0, name: "Los", nameEn: "Go", price: 0, type: "corner" },
  { id: 1, name: "Schloss\nallee", nameEn: "Mediterranean Avenue", price: 60, type: "property", color: "brown", rent: [2, 10, 30, 90, 160, 250], group: "brown" },
  { id: 2, name: "Gemein\nschafts\nfeld", nameEn: "Community Chest", price: 0, type: "community" },
  { id: 3, name: "Turm\nstraße", nameEn: "Baltic Avenue", price: 60, type: "property", color: "brown", rent: [4, 20, 60, 180, 320, 450], group: "brown" },
  { id: 4, name: "Einkommens\nsteuer", nameEn: "Income Tax", price: 0, type: "tax", taxAmount: 200 },
  { id: 5, name: "Süd\nbahnhof", nameEn: "Reading Railroad", price: 200, type: "railroad", rent: [25, 50, 100, 200] },
  { id: 6, name: "Chaussee\nstraße", nameEn: "Oriental Avenue", price: 100, type: "property", color: "lightblue", rent: [6, 30, 90, 270, 400, 550], group: "lightblue" },
  { id: 7, name: "Ereignis\nfeld", nameEn: "Chance", price: 0, type: "chance" },
  { id: 8, name: "Elisen\nstraße", nameEn: "Vermont Avenue", price: 100, type: "property", color: "lightblue", rent: [6, 30, 90, 270, 400, 550], group: "lightblue" },
  { id: 9, name: "Post\nstraße", nameEn: "Connecticut Avenue", price: 120, type: "property", color: "lightblue", rent: [8, 40, 100, 300, 450, 600], group: "lightblue" },
  
  // Left side (10)
  { id: 10, name: "Gefängnis", nameEn: "Just Visiting/Jail", price: 0, type: "corner" },
  
  // Left column (11-20)
  { id: 11, name: "See\nstraße", nameEn: "St. Charles Place", price: 140, type: "property", color: "pink", rent: [10, 50, 150, 450, 625, 750], group: "pink" },
  { id: 12, name: "Elektrizität\nswerk", nameEn: "Electric Company", price: 150, type: "utility", rent: [4, 10] },
  { id: 13, name: "Hafen\nstraße", nameEn: "States Avenue", price: 140, type: "property", color: "pink", rent: [10, 50, 150, 450, 625, 750], group: "pink" },
  { id: 14, name: "Neue\nStraße", nameEn: "Virginia Avenue", price: 160, type: "property", color: "pink", rent: [12, 60, 180, 500, 700, 900], group: "pink" },
  { id: 15, name: "West\nbahnhof", nameEn: "Pennsylvania Railroad", price: 200, type: "railroad", rent: [25, 50, 100, 200] },
  { id: 16, name: "München\nstraße", nameEn: "St. James Place", price: 180, type: "property", color: "orange", rent: [14, 70, 200, 550, 750, 950], group: "orange" },
  { id: 17, name: "Gemein\nschafts\nfeld", nameEn: "Community Chest", price: 0, type: "community" },
  { id: 18, name: "Wiener\nStraße", nameEn: "Tennessee Avenue", price: 180, type: "property", color: "orange", rent: [14, 70, 200, 550, 750, 950], group: "orange" },
  { id: 19, name: "Berliner\nStraße", nameEn: "New York Avenue", price: 200, type: "property", color: "orange", rent: [16, 80, 220, 600, 800, 1000], group: "orange" },
  
  // Top left corner (20)
  { id: 20, name: "Frei\nParken", nameEn: "Free Parking", price: 0, type: "corner" },
  
  // Top row (21-30)
  { id: 21, name: "Theater\nstraße", nameEn: "Kentucky Avenue", price: 220, type: "property", color: "red", rent: [18, 90, 250, 700, 875, 1050], group: "red" },
  { id: 22, name: "Ereignis\nfeld", nameEn: "Chance", price: 0, type: "chance" },
  { id: 23, name: "Museum\nstraße", nameEn: "Indiana Avenue", price: 220, type: "property", color: "red", rent: [18, 90, 250, 700, 875, 1050], group: "red" },
  { id: 24, name: "Opern\nplatz", nameEn: "Illinois Avenue", price: 240, type: "property", color: "red", rent: [20, 100, 300, 750, 925, 1100], group: "red" },
  { id: 25, name: "Nord\nbahnhof", nameEn: "B&O Railroad", price: 200, type: "railroad", rent: [25, 50, 100, 200] },
  { id: 26, name: "Lessing\nstraße", nameEn: "Atlantic Avenue", price: 260, type: "property", color: "yellow", rent: [22, 110, 330, 800, 975, 1150], group: "yellow" },
  { id: 27, name: "Schiller\nstraße", nameEn: "Ventnor Avenue", price: 260, type: "property", color: "yellow", rent: [22, 110, 330, 800, 975, 1150], group: "yellow" },
  { id: 28, name: "Wasser\nwerk", nameEn: "Water Works", price: 150, type: "utility", rent: [4, 10] },
  { id: 29, name: "Goethe\nstraße", nameEn: "Marvin Gardens", price: 280, type: "property", color: "yellow", rent: [24, 120, 360, 850, 1025, 1200], group: "yellow" },
  
  // Top right corner (30)
  { id: 30, name: "Gehe ins\nGefängnis", nameEn: "Go To Jail", price: 0, type: "corner" },
  
  // Right column (31-39)
  { id: 31, name: "Rathaus\nplatz", nameEn: "Pacific Avenue", price: 300, type: "property", color: "green", rent: [26, 130, 390, 900, 1100, 1275], group: "green" },
  { id: 32, name: "Haupt\nstraße", nameEn: "North Carolina Avenue", price: 300, type: "property", color: "green", rent: [26, 130, 390, 900, 1100, 1275], group: "green" },
  { id: 33, name: "Gemein\nschafts\nfeld", nameEn: "Community Chest", price: 0, type: "community" },
  { id: 34, name: "Bahnhof\nstraße", nameEn: "Pennsylvania Avenue", price: 320, type: "property", color: "green", rent: [28, 150, 450, 1000, 1200, 1400], group: "green" },
  { id: 35, name: "Haupt\nbahnhof", nameEn: "Short Line", price: 200, type: "railroad", rent: [25, 50, 100, 200] },
  { id: 36, name: "Ereignis\nfeld", nameEn: "Chance", price: 0, type: "chance" },
  { id: 37, name: "Park\nstraße", nameEn: "Park Place", price: 350, type: "property", color: "darkblue", rent: [35, 175, 500, 1100, 1300, 1500], group: "darkblue" },
  { id: 38, name: "Zusatz\nsteuer", nameEn: "Luxury Tax", price: 0, type: "tax", taxAmount: 100 },
  { id: 39, name: "Schloss\nplatz", nameEn: "Boardwalk", price: 400, type: "property", color: "darkblue", rent: [50, 200, 600, 1400, 1700, 2000], group: "darkblue" },

];

function boardSize() {
  return monopolyBoard.length;
}

function getFieldById(id) {
  return monopolyBoard.find(field => field.id === id);
}

function resetBoard() {
  monopolyBoard.forEach(field => {
    field.owner = null;
    field.houses = 0;
    field.hotels = 0;
  });
}