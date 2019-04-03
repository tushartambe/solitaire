import Card from "./Card";
import Symbol from "./Symbol";

class DiamondCards {
  constructor() {
    this.unicodes = [
      `&#127169;`,
      `&#127170;`,
      `&#127171;`,
      `&#127172;`,
      `&#127173;`,
      `&#127174;`,
      `&#127175;`,
      `&#127176;`,
      `&#127177;`,
      `&#127178;`,
      `&#127179;`,
      `&#127181;`,
      `&#127182;`
    ];
    this.color = "RED";
    this.type = "DIAMOND";
    this.cards = this.createCards();
  }
  createCards() {
    let cards = [];
    for (let index = 1; index < 14; index++) {
      let symbol = new Symbol(this.type, this.color);
      cards.push(new Card(index, symbol, this.unicodes[index - 1]));
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
