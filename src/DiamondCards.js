import Card from "./Card";
import Symbol from "./Symbol";

class DiamondCards {
  constructor() {
    this.color = "RED";
    this.type = "diamond";
    this.cards = this.createCards();
  }

  createCards() {
    let cards = [];
    let unicodeNum = 127169;
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

export default DiamondCards;
