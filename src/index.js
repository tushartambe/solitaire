import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./Game";

class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.cards = [];
    this.returnCards = this.returnCards.bind(this);
    this.displayCurrentCard = this.displayCurrentCard.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  displayCurrentCard() {
    let card = new Game().drawCardFromDeck();
    let divElelmet = document.getElementById("open-cards");
    let div = document.createElement("div");

    div.innerHTML = card.unicode;
    div.className = "card";
    div.id = "drag_" + card.number;
    div.style.color = card.symbol.color;

    div.setAttribute("draggable", true);
    div.ondragstart = this.handleDrag;
    divElelmet.appendChild(div);
  }

  handleDrag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }

  handleDrop(event) {
    console.log(event);
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
  }

  allowDrop(event) {
    event.preventDefault();
  }

  returnCards() {
    return (
      <div>
        {" "}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="deck" onClick={this.displayCurrentCard}>
            Deck
          </div>
          <div className="open-cards" id="open-cards" />
          <div className="place-here">
            <div
              id="drop-here"
              className="drop-here"
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            />
            <div
              id="drop-here"
              className="drop-here"
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            />
            <div
              id="drop-here"
              className="drop-here"
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            />
            <div
              id="drop-here"
              className="drop-here"
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            />
          </div>
        </div>
        <hr />
        <div>
          <div className="pile-lots">
            <div
              id="piles"
              className="piles"
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            />
            <div
              id="piles"
              className="piles"
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            />
            <div
              id="piles"
              className="piles"
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            />
            <div
              id="piles"
              className="piles"
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            />
            <div
              id="piles"
              className="piles"
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            />
            <div
              id="piles"
              className="piles"
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            />
            <div
              id="piles"
              className="piles"
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            />
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
