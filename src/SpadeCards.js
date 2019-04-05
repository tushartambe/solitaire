import Card from "./Card";
import Symbol from "./Symbol";

class SpadeCards {
  constructor() {
    this.color = "BLACK";
    this.type = "spade";
    this.cards = this.createCards();
  }

  createCards() {
    let cards = [];
    let unicodeNum = 127137;
    for (let index = 1; index < 14; index++) {
      let unicode = `&#${unicodeNum}`;
      cards.push(new Card(index, this.type, this.color, unicode));
      unicodeNum++;
    }
    return cards;
  }

  addDraggableCards(cards) {
    for (let index = this.cards.length; index > 0; index--) {
      let card = this.cards[index - 1];
      card.addDraggableCard(cards[index - 2]);
    }
  }

  getCards() {
    return this.cards;
  }
}

export default SpadeCards;
