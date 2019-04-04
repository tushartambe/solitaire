class Piles {
  constructor(cards) {
    this.cards = cards;
    this.piles = this.createPiles();
  }

  createPiles() {
    let piles = [];
    for (let i = 1; i <= 7; i++) {
      piles.push(this.cards.splice(0, i));
    }
    return piles;
  }

  getPiles() {
    return this.piles;
  }
}

export default Piles;
