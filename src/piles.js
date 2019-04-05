import Pile from "./Pile";

class Piles {
  constructor(cards) {
    this.cards = cards;
    this.piles = [];
    this.createPiles();
  }

  createPiles() {
    for (let i = 0; i < 7; i++) {
      const pile = new Pile();
      pile.addRestrictedCards(this.cards.splice(0, i));
      pile.addAccessibleCard(this.cards.splice(0, 1));
      this.piles.push(pile);
    }
  }

  getPiles() {
    return this.piles;
  }
  isDroppable(dropLocation) {
    return this.piles[dropLocation];
  }

  moveCardToStack(pileNumber) {
    const pile = this.piles[pileNumber];
    if (pile.accessibleCards.length === 0) {
      pile.accessibleCards.pop();
      pile.accessibleCards(pile.restrictedCards.pop());
    }
  }

  updateCards() {
    if (this.accessibleCards.length === 0) {
      this.accessibleCards.push(this.restrictedCards.pop());
    }
  }

  isAbleToDrop(card) {
    if (
      this.accessibleCards[this.accessibleCards.length - 1].sequenceNumber -
        1 ===
        card.sequenceNumber &&
      this.accessibleCards[this.accessibleCards.length - 1].colour !==
        card.colour
    ) {
      this.restrictedCards = this.restrictedCards.concat(this.accessibleCards);
      this.accessibleCards.push(card);
      return true;
    }
    return false;
  }
}

export default Piles;
