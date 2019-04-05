import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';

const handleDrag = function(card, event) {
  event.dataTransfer.setData('text', event.target.id);
};

const handleDrop = function(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData('text');
  let draggedCard = document.getElementById(data);
  let draggedCardType = draggedCard.id.split('_')[2];
  let targetStackType = event.target.id;

  if (targetStackType == draggedCardType) {
    event.target.appendChild(draggedCard);
    return;
  }
};

const handleDropOnPile = function(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData('text');
  let draggedCard = document.getElementById(data);

  event.target.appendChild(draggedCard);
};

const allowDrop = function(event) {
  event.preventDefault();
};

const Pile = function(props) {
  let { cards } = props;
  return cards.map(card => {
    return <Card card={card} classname={'pile-card'} />;
  });
};

const Piles = function(props) {
  let { piles } = props;
  let output = [];
  for (let i = 0; i < piles.length; i++) {
    let div = (
      <div
        id={`piles_${i}`}
        key={`piles_${i}`}
        className='piles'
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
      className='drop-here'
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
  stackHtml.push(<Suit suit={stack['heart']} suitName={'heart'} />);
  stackHtml.push(<Suit suit={stack['spade']} suitName={'spade'} />);
  stackHtml.push(<Suit suit={stack['diamond']} suitName={'diamond'} />);
  stackHtml.push(<Suit suit={stack['club']} suitName={'club'} />);
  return stackHtml;
};

const Card = function(props) {
  let { card, classname } = props;
  return (
    <div
      id={`card_${card.number}_${card.symbol.type}`}
      className={classname}
      style={{ color: card.symbol.color }}
      draggable={true}
      onDragStart={handleDrag.bind(null, card)}
      dangerouslySetInnerHTML={{ __html: `${card.unicode}` }}
    />
  );
};

const Cards = function(props) {
  const { cards } = props;
  const cardsHtml = [];
  for (let index = 0; index < cards.length; index++) {
    cardsHtml.push(
      <Card
        classname={'card'}
        card={cards[index]}
        unicode={cards[index].unicode}
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
    this.state = { openCards: [] };
  }

  displayCurrentCard() {
    let card = this.game.drawCardFromDeck();
    this.state.openCards.push(card);
    this.setState({
      openCards: this.state.openCards
    });
  }

  returnCards() {
    return (
      <div>
        <div className='top-section'>
          <div className='deck' onClick={this.displayCurrentCard}>
            Deck
          </div>
          <div className='open-cards' id='open-card'>
            <Cards cards={this.state.openCards} />
          </div>
          <div className='place-here'>
            <Stack stack={this.game.stack} />
          </div>
        </div>
        <hr />
        <div className='bottom-section'>
          <div className='pile-lots'>
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

ReactDOM.render(<StartGame />, document.getElementById('root'));
