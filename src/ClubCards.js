import Card from './Card';
import Symbol from './Symbol';

class ClubCards {
  constructor() {
    this.color = 'BLACK';
    this.type = 'club';
    this.cards = this.createCards();
  }

  createCards() {
    let cards = [];
    let unicodeNum = 127185;
    for (let index = 1; index < 14; index++) {
      let unicode = `&#${unicodeNum}`;
      let symbol = new Symbol(this.type, this.color);
      cards.push(new Card(index, symbol, unicode));
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

export default ClubCards;
