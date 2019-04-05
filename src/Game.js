import Cards from "./Cards";
import Deck from "./Deck";
import Piles from "./piles";
import lodash from "lodash";
import Stack from "./Stack";
import CardDeck from "./CardDeck";
import Suit from "./Suit";

class Game {
  constructor() {
    this.cards = new Cards().getCards();
    this.deck = new Deck(this.createDeck());
    this.deckCardIndex = 0;
    this.cardDeck = new CardDeck(
      new Suit(),
      new Suit(),
      new Suit(),
      new Suit()
    );
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

  moveCardToStack(card, dragLocation, dropLocation) {
    const pileNumber = dropLocation.split(" ")[1];
    if (pileNumber && this.piles[pileNumber].isAbleToDrop(card)) {
      if (this.piles.isDroppable(dragLocation)) {
        this.piles.moveCardToStack(dragLocation);
      }
      return true;
    }
    return false;
  }

  dropCard(cardDetails, dropLocation) {
    return cardDetails.type == dropLocation.split("_")[1];
    // const card = JSON.parse(cardDetails);
    // const dragLocation = card.draggingFrom.split("_")[1];
    // if (this.cardDeck.isAbleToDrop(card, dropLocation)) {
    //   if (this.piles.isDroppable(dragLocation)) {
    //     this.piles.moveCardToStack(dragLocation);
    //   }
    //   return true;
    // }
    // return this.moveCardToStack(card, dragLocation, dropLocation);
  }
}

export default Game;
