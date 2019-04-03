import Card from "./Card";
import Symbol from "./Symbol";

class SpadeCards {
  constructor() {
    this.unicodes = [
      `&#127137;`,
      `&#127138;`,
      `&#127139;`,
      `&#127140;`,
      `&#127141;`,
      `&#127142;`,
      `&#127143;`,
      `&#127144;`,
      `&#127145;`,
      `&#127146;`,
      `&#127147;`,
      `&#127149;`,
      `&#127150;`
    ];
    this.color = "BLACK";
    this.type = "SPADE";
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

export default SpadeCards;
