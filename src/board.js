export const monopolyBoard = [
  // Bottom row (0-10)
  { id: 0, name: "Los", nameEn: "GO", price: 0, type: "corner", reward: 200 },
  { id: 1, name: "Schlossallee", nameEn: "Mediterranean Avenue", price: 60, type: "property", color: "brown", rent: [2, 10, 30, 90, 160, 250], group: "brown" },
  { id: 2, name: "Gemeinschaftsfeld", nameEn: "Community Chest", price: 0, type: "community" },
  { id: 3, name: "Turmstraße", nameEn: "Baltic Avenue", price: 60, type: "property", color: "brown", rent: [4, 20, 60, 180, 320, 450], group: "brown" },
  { id: 4, name: "Einkommensteuer", nameEn: "Income Tax", price: 0, type: "tax", taxAmount: 200 },
  { id: 5, name: "Südbahnhof", nameEn: "Reading Railroad", price: 200, type: "railroad", rent: [25, 50, 100, 200] },
  { id: 6, name: "Chausseestraße", nameEn: "Oriental Avenue", price: 100, type: "property", color: "lightblue", rent: [6, 30, 90, 270, 400, 550], group: "lightblue" },
  { id: 7, name: "Ereignisfeld", nameEn: "Chance", price: 0, type: "chance" },
  { id: 8, name: "Elisenstraße", nameEn: "Vermont Avenue", price: 100, type: "property", color: "lightblue", rent: [6, 30, 90, 270, 400, 550], group: "lightblue" },
  { id: 9, name: "Poststraße", nameEn: "Connecticut Avenue", price: 120, type: "property", color: "lightblue", rent: [8, 40, 100, 300, 450, 600], group: "lightblue" },
  
  // Left side (10)
  { id: 10, name: "Gefängnis", nameEn: "Just Visiting/Jail", price: 0, type: "corner" },
  
  // Left column (11-20)
  { id: 11, name: "Seestraße", nameEn: "St. Charles Place", price: 140, type: "property", color: "pink", rent: [10, 50, 150, 450, 625, 750], group: "pink" },
  { id: 12, name: "Elektrizitätswerk", nameEn: "Electric Company", price: 150, type: "utility", rent: [4, 10] },
  { id: 13, name: "Hafenstraße", nameEn: "States Avenue", price: 140, type: "property", color: "pink", rent: [10, 50, 150, 450, 625, 750], group: "pink" },
  { id: 14, name: "Neue Straße", nameEn: "Virginia Avenue", price: 160, type: "property", color: "pink", rent: [12, 60, 180, 500, 700, 900], group: "pink" },
  { id: 15, name: "Westbahnhof", nameEn: "Pennsylvania Railroad", price: 200, type: "railroad", rent: [25, 50, 100, 200] },
  { id: 16, name: "Münchener Straße", nameEn: "St. James Place", price: 180, type: "property", color: "orange", rent: [14, 70, 200, 550, 750, 950], group: "orange" },
  { id: 17, name: "Gemeinschaftsfeld", nameEn: "Community Chest", price: 0, type: "community" },
  { id: 18, name: "Wiener Straße", nameEn: "Tennessee Avenue", price: 180, type: "property", color: "orange", rent: [14, 70, 200, 550, 750, 950], group: "orange" },
  { id: 19, name: "Berliner Straße", nameEn: "New York Avenue", price: 200, type: "property", color: "orange", rent: [16, 80, 220, 600, 800, 1000], group: "orange" },
  
  // Top left corner (20)
  { id: 20, name: "Frei Parken", nameEn: "Free Parking", price: 0, type: "corner" },
  
  // Top row (21-30)
  { id: 21, name: "Theaterstraße", nameEn: "Kentucky Avenue", price: 220, type: "property", color: "red", rent: [18, 90, 250, 700, 875, 1050], group: "red" },
  { id: 22, name: "Ereignisfeld", nameEn: "Chance", price: 0, type: "chance" },
  { id: 23, name: "Museumstraße", nameEn: "Indiana Avenue", price: 220, type: "property", color: "red", rent: [18, 90, 250, 700, 875, 1050], group: "red" },
  { id: 24, name: "Opernplatz", nameEn: "Illinois Avenue", price: 240, type: "property", color: "red", rent: [20, 100, 300, 750, 925, 1100], group: "red" },
  { id: 25, name: "Nordbahnhof", nameEn: "B&O Railroad", price: 200, type: "railroad", rent: [25, 50, 100, 200] },
  { id: 26, name: "Lessingstraße", nameEn: "Atlantic Avenue", price: 260, type: "property", color: "yellow", rent: [22, 110, 330, 800, 975, 1150], group: "yellow" },
  { id: 27, name: "Schillerstraße", nameEn: "Ventnor Avenue", price: 260, type: "property", color: "yellow", rent: [22, 110, 330, 800, 975, 1150], group: "yellow" },
  { id: 28, name: "Wasserwerk", nameEn: "Water Works", price: 150, type: "utility", rent: [4, 10] },
  { id: 29, name: "Goethestraße", nameEn: "Marvin Gardens", price: 280, type: "property", color: "yellow", rent: [24, 120, 360, 850, 1025, 1200], group: "yellow" },
  
  // Top right corner (30)
  { id: 30, name: "Gehe ins Gefängnis", nameEn: "Go To Jail", price: 0, type: "corner" },
  
  // Right column (31-39)
  { id: 31, name: "Rathausplatz", nameEn: "Pacific Avenue", price: 300, type: "property", color: "green", rent: [26, 130, 390, 900, 1100, 1275], group: "green" },
  { id: 32, name: "Hauptstraße", nameEn: "North Carolina Avenue", price: 300, type: "property", color: "green", rent: [26, 130, 390, 900, 1100, 1275], group: "green" },
  { id: 33, name: "Gemeinschaftsfeld", nameEn: "Community Chest", price: 0, type: "community" },
  { id: 34, name: "Bahnhofstraße", nameEn: "Pennsylvania Avenue", price: 320, type: "property", color: "green", rent: [28, 150, 450, 1000, 1200, 1400], group: "green" },
  { id: 35, name: "Hauptbahnhof", nameEn: "Short Line", price: 200, type: "railroad", rent: [25, 50, 100, 200] },
  { id: 36, name: "Ereignisfeld", nameEn: "Chance", price: 0, type: "chance" },
  { id: 37, name: "Parkstraße", nameEn: "Park Place", price: 350, type: "property", color: "darkblue", rent: [35, 175, 500, 1100, 1300, 1500], group: "darkblue" },
  { id: 38, name: "Zusatzsteuer", nameEn: "Luxury Tax", price: 0, type: "tax", taxAmount: 100 },
  { id: 39, name: "Schlossallee", nameEn: "Boardwalk", price: 400, type: "property", color: "darkblue", rent: [50, 200, 600, 1400, 1700, 2000], group: "darkblue" }
];

export function boardSize() {
  return monopolyBoard.length;
}

export function getFieldById(id) {
  return monopolyBoard.find(field => field.id === id);
}

export function resetBoard() {
  monopolyBoard.forEach(field => {
    field.owner = null;
    field.houses = 0;
    field.hotels = 0;
  });
}

export default monopolyBoard;