import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./Game";

const handleDrag = function(card, event) {
  event.dataTransfer.setData("text", event.target.id);
  card.draggingFrom = event.target.parentNode.id;
  event.dataTransfer.setData("cardDetails", JSON.stringify(card));
};

const handleDrop = function(game, event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let card = event.dataTransfer.getData("cardDetails");
  let draggedCard = document.getElementById(data);
  // let draggedCardType = draggedCard.id.split("_")[2];
  let targetStackType = event.target.id;
  if (game.dropCard(card, targetStackType)) {
    event.target.appendChild(draggedCard);
  }
};

const handleDropOnPile = function(game, event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let draggedCard = document.getElementById(data);

  let draggedCardType = draggedCard.id.split("_")[2];
  let targetPileType = event.target.id;

  if (targetPileType.split("_")[0] == "piles") {
    event.target.appendChild(draggedCard);
    return;
  }
  // event.target.appendChild(draggedCard);
};

const allowDrop = function(game, event) {
  event.preventDefault();
};

const Pile = function(props) {
  let { cards } = props;
  let cardsHtml = [];

  let defaultUnicode = "\u{1F0A0}";
  const accessibleCards = cards.getAccessibleCards();
  const restrictedCards = cards.getRestrictedCards();
  for (let i1 = 0; i1 < restrictedCards.length; i1++) {
    cardsHtml.push(
      <Card
        card={restrictedCards[i1]}
        classname={"pile-card"}
        draggable={false}
        unicode={defaultUnicode}
        key={"restricted " + i1}
      />
    );
  }

  for (let i1 = 0; i1 < accessibleCards.length; i1++) {
    cardsHtml.push(
      <Card
        card={accessibleCards[i1]}
        classname={"pile-card"}
        draggable={true}
        unicode={accessibleCards[i1].unicode}
        key={"accessible " + i1}
      />
    );
  }
  return cardsHtml;
};

const Piles = function(props) {
  let { game, piles } = props;
  let output = [];
  for (let i = 0; i < piles.length; i++) {
    let div = (
      <div
        id={`piles_${i}`}
        key={`piles_${i}`}
        className="piles"
        onDrop={handleDropOnPile.bind(null, game)}
        onDragOver={allowDrop.bind(null, game)}
      >
        <Pile cards={piles[i]} />
      </div>
    );
    output.push(div);
  }
  return output;
};

const Suit = function(props) {
  const { suit } = props;
  const suitHtml = [];
  suitHtml.push(
    <Cards
      cards={suit.getAccessibleCards()}
      draggable={true}
      key={"accessible-suit"}
    />
  );
  suitHtml.push(
    <Cards
      cards={suit.getRestrictedCards()}
      draggable={false}
      key={"restricted-suit"}
    />
  );
  return suitHtml;
};

const Stack = function(props) {
  const { stack, game } = props;
  const deck = stack.getDeck();
  const stackHtml = [];
  stackHtml.push(<Suit suit={deck["heart"]} suitName={"heart"} game={game} />);
  stackHtml.push(<Suit suit={deck["spade"]} suitName={"spade"} />);
  stackHtml.push(<Suit suit={deck["diamond"]} suitName={"diamond"} />);
  stackHtml.push(<Suit suit={deck["club"]} suitName={"club"} />);
  return stackHtml;
};

const Card = function(props) {
  let { card, classname, draggable, unicode } = props;
  return (
    <div
      id={`card_${card.number}_${card.type}`}
      className={classname}
      style={{ color: card.color }}
      draggable={draggable}
      onDragStart={handleDrag.bind(null, card)}
      dangerouslySetInnerHTML={{ __html: `${unicode}` }}
    />
  );
};

const Cards = function(props) {
  const { cards } = props;
  const cardsHtml = [];
  for (let index = 0; index < cards.length; index++) {
    cardsHtml.push(
      <Card
        classname={"card"}
        card={cards[index]}
        unicode={cards[index].unicode}
        draggable={true}
      />
    );
  }
  return cardsHtml;
};

const Deck = function(props) {
  const { deck, game } = props;
  const { heart, diamond, club, spade } = deck.getDeck();
  const deckHtml = [];
  deckHtml.push(
    <div className="drop-here" key={"heart"} id="heart">
      heart
      <Suit suit={heart} />
    </div>
  );
  deckHtml.push(
    <div className="drop-here" key={"diamond"} id="diamond">
      diamond
      <Suit suit={diamond} />
    </div>
  );
  deckHtml.push(
    <div className="drop-here" key={"club"} id="club">
      club
      <Suit suit={club} />
    </div>
  );
  deckHtml.push(
    <div className="drop-here" key={"spade"} id="spade">
      spade
      <Suit suit={spade} />
    </div>
  );
  return (
    <div
      className="place-here"
      onDrop={handleDrop.bind(null, game)}
      onDragOver={allowDrop.bind(null, game)}
    >
      {deckHtml}
    </div>
  );
};

class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.cards = [];
    this.game = new Game();
    this.returnCards = this.returnCards.bind(this);
    this.displayCurrentCard = this.displayCurrentCard.bind(this);
    this.deck = this.game.deck;
    this.state = {
      openCards: [],
      piles: this.game.piles,
      deck: this.game.cardDeck.getDeck
    };
  }

  displayCurrentCard() {
    let card = this.game.drawCardFromDeck();
    // console.log(this.state.openCards);
    this.state.openCards.push(card);
    this.setState({
      openCards: this.state.openCards
    });
    // console.log(this.state.openCards);
  }

  returnCards() {
    return (
      <div>
        <div className="top-section" style={{ display: "flex" }}>
          <div className="deck-and-open-cards">
            <div className="deck" onClick={this.displayCurrentCard}>
              Deck
            </div>
            <div className="open-cards" id="open-card">
              <Cards cards={this.state.openCards} />
            </div>
          </div>
          <div className="place-here">
            <Deck deck={this.game.cardDeck} game={this.game} />
          </div>
        </div>
        <hr />
        <div className="bottom-section">
          <div className="pile-lots">
            <Piles piles={this.game.piles} game={this.game} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <section>{this.returnCards()}</section>;
  }
}

ReactDOM.render(<StartGame />, document.getElementById("root"));
