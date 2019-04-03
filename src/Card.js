class Card {
  constructor(number, symbol, unicode) {
    this.number = number;
    this.symbol = symbol;
    this.unicode = unicode;
    this.draggableCards = [];
  }
  addDraggableCard(card) {
    this.draggableCards.push(card);
  }
}

export default Card;
