export class Player {
  constructor(id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.position = 0;
    this.money = 1500;
    this.properties = [];
    this.inJail = false;
  }

  move(steps, boardLength) {
    this.position = (this.position + steps) % boardLength;
    // If player passes "Los", earn 200
    if (this.position < steps) {
      this.money += 200;
    }
  }

  buyProperty(field) {
    if (this.money >= field.price && field.price > 0) {
      this.money -= field.price;
      this.properties.push(field.id);
      field.owner = this.id;
      return true;
    }
    return false;
  }

  payRent(amount) {
    this.money -= amount;
  }

  receiveRent(amount) {
    this.money += amount;
  }

  isBankrupt() {
    return this.money < 0;
  }
}