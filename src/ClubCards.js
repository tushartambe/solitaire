import Card from "./Card";
import Symbol from "./Symbol";

class ClubCards {
  constructor() {
    this.unicodes = [
      `&#127185;`,
      `&#127186;`,
      `&#127187;`,
      `&#127188;`,
      `&#127189;`,
      `&#127190;`,
      `&#127191;`,
      `&#127192;`,
      `&#127193;`,
      `&#127194;`,
      `&#127195;`,
      `&#127197;`,
      `&#127198;`
    ];
    this.color = "BLACK";
    this.type = "CLUB";
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

export default ClubCards;
