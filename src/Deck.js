class Deck {
  constructor(cards) {
    this.cards = cards;
    this.cardIndex = 0;
  }

  drawCard() {
    if (this.cardIndex > this.cards.length) this.cardIndex = 0;
    this.cardIndex++;
    return this.cards[this.cardIndex];
  }
}

export default Deck;
