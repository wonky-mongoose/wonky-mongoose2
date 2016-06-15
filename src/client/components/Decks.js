import React, { PropTypes } from 'react';
import DeckItem from './DeckItem';

export default class Decks extends React.Component {
  constructor(props) {
    super(props);
    console.log('PROPS IN DECKS', props);

  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.postDeck(this.refs.name.value, this.props.user._id);
  }
  
  deleteCard() {
    this.props.deleteCard(this.props.deck._id);
  }

  render () {  
    return (
      <div className="container">
        <h4 className="center grey-text text-darken-4"> Decks </h4>
        <div className='row'>
          <form className='col l5' onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="name" placeholder="Deck name"/>
            <input className='btn' type="submit" value="Add new deck"/>
          </form>
        </div>
        <div className="card-list">
          <div className="card-columns">
            {this.props.decks.map((deck, idx) => <DeckItem key={idx} deck={deck} />)}
          </div>
        </div>
      </div>
    );
  }
}