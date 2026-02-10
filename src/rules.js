/*
Monopoly Game Rules - Classic Edition
*/

export class MonopolyRules {
  
  // Starting money for each player
  static STARTING_MONEY = 1500;
  
  // Go (Los) reward
  static GO_REWARD = 200;
  
  // Jail
  static JAIL_FINE = 50;
  static MAX_JAIL_TURNS = 3;
  
  // Calculate rent for a property
  static calculateRent(field, diceRoll, owner) {
    if (!field.owner) return 0;
    
    switch(field.type) {
      case 'property':
        return this.calculatePropertyRent(field, owner);
      case 'railroad':
        return this.calculateRailroadRent(field, owner);
      case 'utility':
        return this.calculateUtilityRent(field, diceRoll, owner);
      default:
        return 0;
    }
  }
  
  // Property rent calculation
  static calculatePropertyRent(field, owner) {
    // Check if owner has monopoly (all properties of same color)
    const hasMonopoly = this.hasMonopoly(field, owner);
    
    // Base rent is first element in rent array
    let rent = field.rent[0];
    
    // If monopoly but no houses, rent is doubled
    if (hasMonopoly && (!field.houses || field.houses === 0)) {
      rent = field.rent[0] * 2;
    }
    
    // With houses/hotels
    if (field.houses > 0 && field.houses <= 4) {
      rent = field.rent[field.houses];
    } else if (field.hotels > 0) {
      rent = field.rent[5]; // Hotel rent
    }
    
    return rent;
  }
  
  // Railroad rent calculation
  static calculateRailroadRent(field, owner) {
    const railroadCount = this.countOwnedRailroads(owner);
    return field.rent[railroadCount - 1] || 0;
  }
  
  // Utility rent calculation
  static calculateUtilityRent(field, diceRoll, owner) {
    const utilityCount = this.countOwnedUtilities(owner);
    
    if (utilityCount === 1) {
      return diceRoll * 4;
    } else if (utilityCount === 2) {
      return diceRoll * 10;
    }
    
    return 0;
  }
  
  // Check if player has monopoly on a color group
  static hasMonopoly(field, owner) {
    if (!field.group) return false;
    
    const groupProperties = owner.properties.filter(propId => {
      const prop = this.getPropertyById(propId);
      return prop && prop.group === field.group;
    });
    
    const totalInGroup = this.countPropertiesInGroup(field.group);
    return groupProperties.length === totalInGroup;
  }
  
  // Count properties in a color group
  static countPropertiesInGroup(group) {
    const groupCounts = {
      'brown': 2,
      'lightblue': 3,
      'pink': 3,
      'orange': 3,
      'red': 3,
      'yellow': 3,
      'green': 3,
      'darkblue': 2
    };
    
    return groupCounts[group] || 0;
  }
  
  // Count owned railroads
  static countOwnedRailroads(owner) {
    return owner.properties.filter(propId => {
      const prop = this.getPropertyById(propId);
      return prop && prop.type === 'railroad';
    }).length;
  }
  
  // Count owned utilities
  static countOwnedUtilities(owner) {
    return owner.properties.filter(propId => {
      const prop = this.getPropertyById(propId);
      return prop && prop.type === 'utility';
    }).length;
  }
  
  // Get property by ID (this should reference the board)
  static getPropertyById(id) {
    // This will be implemented in game.js
    return null;
  }
  
  // Can player buy property?
  static canBuyProperty(player, field) {
    return !field.owner && 
           field.price > 0 && 
           player.money >= field.price &&
           (field.type === 'property' || field.type === 'railroad' || field.type === 'utility');
  }
  
  // Mortgage value (50% of purchase price)
  static getMortgageValue(field) {
    return Math.floor(field.price / 2);
  }
  
  // Unmortgage cost (mortgage value + 10%)
  static getUnmortgageCost(field) {
    return Math.floor(this.getMortgageValue(field) * 1.1);
  }
  
  // House cost (varies by color group)
  static getHouseCost(field) {
    const houseCosts = {
      'brown': 50,
      'lightblue': 50,
      'pink': 100,
      'orange': 100,
      'red': 150,
      'yellow': 150,
      'green': 200,
      'darkblue': 200
    };
    
    return houseCosts[field.group] || 0;
  }
  
  // Hotel cost (same as house cost, but need 4 houses first)
  static getHotelCost(field) {
    return this.getHouseCost(field);
  }
  
  // Can build house?
  static canBuildHouse(field, owner) {
    // Must have monopoly
    if (!this.hasMonopoly(field, owner)) return false;
    
    // Cannot have hotel
    if (field.hotels > 0) return false;
    
    // Max 4 houses
    if (field.houses >= 4) return false;
    
    // Must build evenly across color group
    return this.canBuildEvenly(field, owner);
  }
  
  // Can build hotel?
  static canBuildHotel(field, owner) {
    // Must have monopoly
    if (!this.hasMonopoly(field, owner)) return false;
    
    // Must have 4 houses
    if (field.houses !== 4) return false;
    
    // Cannot already have hotel
    if (field.hotels > 0) return false;
    
    return true;
  }
  
  // Check if can build evenly (houses must be distributed evenly)
  static canBuildEvenly(field, owner) {
    const groupProperties = owner.properties.filter(propId => {
      const prop = this.getPropertyById(propId);
      return prop && prop.group === field.group;
    }).map(propId => this.getPropertyById(propId));
    
    const minHouses = Math.min(...groupProperties.map(p => p.houses || 0));
    return (field.houses || 0) <= minHouses;
  }
  
  // Jail rules
  static canLeaveJail(player, rolledDouble) {
    return rolledDouble || 
           player.jailTurns >= this.MAX_JAIL_TURNS || 
           player.getOutOfJailCards > 0;
  }
  
  // Bankruptcy check
  static isBankrupt(player) {
    return player.money < 0;
  }
}

export default MonopolyRules;
