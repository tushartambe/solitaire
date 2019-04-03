import Card from "./Card";
import Symbol from "./Symbol";

class HeartCards {
  constructor() {
    this.unicodes = [
      `&#127153;`,
      `&#127154;`,
      `&#127155;`,
      `&#127156;`,
      `&#127157;`,
      `&#127158;`,
      `&#127159;`,
      `&#127160;`,
      `&#127161;`,
      `&#127162;`,
      `&#127163;`,
      `&#127165;`,
      `&#127166;`,
      `&#127167;`
    ];
    this.color = "RED";
    this.type = "HEART";
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

export default HeartCards;
