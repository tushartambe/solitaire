class CardDeck {
  constructor(heart, spade, diamond, club) {
    this.deck = { heart, spade, diamond, club };
  }

  addCard(card, cardSuit) {
    this.deck[cardSuit].addCard(card);
  }

  getDeck() {
    return this.deck;
  }

  isAbleToDrop(cardDetails, dropLocation) {
    if (this.deck[dropLocation]) {
      return this.deck[dropLocation].dropCard(cardDetails);
    }
    return false;
  }
}

export default CardDeck;
