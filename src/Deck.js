class Deck {
  constructor(cards) {
    this.cards = cards;
  }

  drawCard() {
    let cardIndex = Math.floor(Math.random() * this.cards.length) + 1;
    return this.cards.splice(cardIndex, 1)[0];
  }
}
export default Deck;
