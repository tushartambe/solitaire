import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./Game";

const handleDrag = function(card, event) {
  event.dataTransfer.setData("text", event.target.id);
};

const handleDrop = function(game, event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let draggedCard = document.getElementById(data);
  let draggedCardType = draggedCard.id.split("_")[2];
  let targetStackType = event.target.id;

  if (targetStackType == draggedCardType) {
    event.target.appendChild(draggedCard);
  }
};

const handleDropOnPile = function(event) {
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

const allowDrop = function(event) {
  event.preventDefault();
};

const Pile = function(props) {
  let { cards } = props;
  let cardsHtml = [];
  for (let i = 0; i < cards.length - 1; i++) {
    cardsHtml.push(
      <Card
        card={cards[i]}
        classname={"pile-card"}
        draggable={false}
        unicode={cards[i].unicode}
      />
    );
  }
  cardsHtml.push(
    <Card
      card={cards[cards.length - 1]}
      classname={"pile-card"}
      draggable={true}
      unicode={cards[cards.length - 1].unicode}
    />
  );
  return cardsHtml;
};

const Piles = function(props) {
  let { piles } = props;
  let output = [];
  for (let i = 0; i < piles.length; i++) {
    let div = (
      <div
        id={`piles_${i}`}
        key={`piles_${i}`}
        className="piles"
        onDrop={handleDropOnPile}
        onDragOver={allowDrop}
      >
        <Pile cards={piles[i]} />
      </div>
    );
    output.push(div);
  }
  return output;
};

const Suit = function(props) {
  const { suitName } = props;

  return (
    <div
      id={suitName}
      key={suitName}
      className="drop-here"
      onDrop={handleDrop}
      onDragOver={allowDrop}
    >
      {suitName}
    </div>
  );
};

const Stack = function(props) {
  const { stack } = props;
  const stackHtml = [];
  stackHtml.push(<Suit suit={stack["heart"]} suitName={"heart"} />);
  stackHtml.push(<Suit suit={stack["spade"]} suitName={"spade"} />);
  stackHtml.push(<Suit suit={stack["diamond"]} suitName={"diamond"} />);
  stackHtml.push(<Suit suit={stack["club"]} suitName={"club"} />);
  return stackHtml;
};

const Card = function(props) {
  let { card, classname, draggable, unicode } = props;
  return (
    <div
      id={`card_${card.number}_${card.symbol.type}`}
      className={classname}
      style={{ color: card.symbol.color }}
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

class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.cards = [];
    this.game = new Game();
    this.returnCards = this.returnCards.bind(this);
    this.displayCurrentCard = this.displayCurrentCard.bind(this);
    this.deck = this.game.deck;
    this.state = { openCards: [], piles: this.game.piles };
    this.drop = this.drop.bind(this);
  }

  displayCurrentCard() {
    let card = this.game.drawCardFromDeck();
    console.log(this.state.openCards);
    this.state.openCards.push(card);
    this.setState({
      openCards: this.state.openCards
    });
    console.log(this.state.openCards);
  }

  drop(event) {
    handleDrop(this.game, event);
    this.setState({
      piles: this.game.piles
    });
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
            <Stack stack={this.game.stack} />
          </div>
        </div>
        <hr />
        <div className="bottom-section">
          <div className="pile-lots">
            <Piles piles={this.game.piles} />
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
