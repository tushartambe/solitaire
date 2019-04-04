import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./Game";

const handleDrag = function(event) {
  event.dataTransfer.setData("text", event.target.id);
};

const handleDrop = function(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let dropTartget = event.target;
  let card = document.getElementById(data);
  if (dropTartget.className == "drop-here") {
    // card.className = "card-on-stack";
    if (dropTartget.childNodes.length == 0) {
      event.target.appendChild(card);
      return;
    }
    event.target.replaceChild(card, dropTartget.childNodes[0]);
  }

  if (dropTartget.className == "piles") {
    // let card = document.getElementById(data);
    card.className = "card-on-piles";
    event.target.appendChild(card);
  }
};

const allowDrop = function(event) {
  event.preventDefault();
};

const Piles = function(props) {
  let output = [];
  for (let i = 1; i <= props.size; i++) {
    let div = (
      <div
        id={`piles_${i}`}
        key={`piles_${i}`}
        className="piles"
        onDrop={handleDrop}
        onDragOver={allowDrop}
      />
    );
    output.push(div);
  }
  return output;
};

const Stack = function(props) {
  let output = [];
  for (let i = 1; i <= props.size; i++) {
    let div = (
      <div
        id={`stack_${i}`}
        key={`stack_${i}`}
        className="drop-here"
        onDrop={handleDrop}
        onDragOver={allowDrop}
      />
    );
    output.push(div);
  }
  return output;
};

const Card = function(card) {
  let div = document.createElement("div");
  div.innerHTML = card.unicode;
  div.className = "card";

  div.id = "card_" + card.symbol.type + card.number;

  div.style.color = card.symbol.color;
  div.setAttribute("draggable", true);
  div.ondragstart = handleDrag;
  return div;
};

class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.cards = [];
    this.returnCards = this.returnCards.bind(this);
    this.displayCurrentCard = this.displayCurrentCard.bind(this);
  }

  displayCurrentCard() {
    let card = new Game().drawCardFromDeck();
    console.log(new Game().deck);

    let divElelmet = document.getElementById("open-cards");
    let div = Card(card);
    divElelmet.appendChild(div);
  }

  returnCards() {
    return (
      <div>
        <div className="top-section">
          <div className="deck" onClick={this.displayCurrentCard}>
            Deck
          </div>
          <div className="open-cards" id="open-cards" />
          <div className="place-here">
            <Stack size={4} />
          </div>
        </div>
        <hr />
        <div>
          <div className="pile-lots">
            <Piles size={7} />
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
