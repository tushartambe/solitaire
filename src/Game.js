import Cards from './Cards';
import Deck from './Deck';
import lodash from 'lodash';

class Game {
  constructor() {
    this.cards = new Cards().getCards();
    this.copiedCards = new Cards().getCards();
    this.deck = new Deck(this.createDeck());
  }

  createDeck() {
    return lodash.shuffle(this.copiedCards).splice(0, 28);
  }

  createPiles() {
    return;
  }

  getCards() {
    return this.cards;
  }

  drawCardFromDeck() {
    return this.deck.drawCard();
  }
}

export default Game;
