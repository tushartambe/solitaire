import Cards from './Cards';
import Deck from './Deck';

class Game {
  constructor() {
    this.cards = new Cards().getCards();
    this.deck = new Deck(this.cards);
  }

  getCards() {
    return this.cards;
  }

  drawCardFromDeck() {
    return this.deck.drawCard();
  }
}

export default Game;
