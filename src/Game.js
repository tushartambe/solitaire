import Cards from './Cards';
import Deck from './Deck';
import Piles from './piles';
import lodash from 'lodash';

class Game {
  constructor() {
    this.cards = new Cards().getCards();
    this.deck = new Deck(this.createDeck());
    this.deckCardIndex = 0;
    this.stack = { heart: [], diamond: [], club: [], spade: [] };
  }

  createDeck() {
    let shuffledCards = lodash.shuffle(this.cards).splice(0, 24);
    let remainingCards = lodash.difference(this.cards, shuffledCards);
    this.piles = new Piles(remainingCards).getPiles();
    return shuffledCards;
  }

  getPiles() {
    return this.piles;
  }

  getCards() {
    return this.cards;
  }

  drawCardFromDeck() {
    return this.deck.drawCard();
  }
}

export default Game;
