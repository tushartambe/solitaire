import ClubCards from "./ClubCards";
import DiamondCards from "./DiamondCards";
import HeartCards from "./HeartCards";
import SpadeCards from "./SpadeCards";
import lodash from "lodash";

class Cards {
  constructor() {
    this.spadeCardsObj = new SpadeCards();
    this.clubCardsObj = new ClubCards();
    this.diamondCardsObj = new DiamondCards();
    this.heartCardsObj = new HeartCards();

    this.spadeCards = this.spadeCardsObj.getCards();
    this.clubCards = this.clubCardsObj.getCards();
    this.diamondCards = this.diamondCardsObj.getCards();
    this.heartCards = this.heartCardsObj.getCards();
    this.addDraggableCards();
  }

  getCards() {
    let cards = [];
    cards.push(this.spadeCards);
    cards.push(this.clubCards);
    cards.push(this.diamondCards);
    cards.push(this.heartCards);
    return lodash.flattenDeep(cards);
  }

  addDraggableCards() {
    this.spadeCardsObj.addDraggableCards(this.heartCards);
    this.spadeCardsObj.addDraggableCards(this.diamondCards);

    this.clubCardsObj.addDraggableCards(this.heartCards);
    this.clubCardsObj.addDraggableCards(this.diamondCards);

    this.diamondCardsObj.addDraggableCards(this.spadeCards);
    this.diamondCardsObj.addDraggableCards(this.clubCards);

    this.heartCardsObj.addDraggableCards(this.spadeCards);
    this.heartCardsObj.addDraggableCards(this.clubCards);
  }
}

export default Cards;
