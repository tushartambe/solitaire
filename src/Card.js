class Card {
  constructor(number, type, color, unicode) {
    this.number = number;
    this.type = type;
    this.color = color;
    this.unicode = unicode;
    this.draggableCards = [];
  }
  addDraggableCard(card) {
    this.draggableCards.push(card);
  }
}

export default Card;
