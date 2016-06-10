import React, { PropTypes } from 'react';
import DeckItem from './DeckItem';

export default class Decks extends React.Component {
  constructor(props) {
    super(props);
    console.log('these are props', props);
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log('THIS IS REFS', this.refs.name.value)
    this.props.postDeck(this.refs.name.value, this.props.user._id);
  }
   
  render () {
    return (
      <div className="container">
        <h4 className="center grey-text text-darken-4"> Decks </h4>
        <div className="card-list">
          <div className="card-columns">
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" ref="name"/>
            </form>
            <button>Create new deck</button>
            {this.props.decks.map((deck, idx) => <DeckItem key={idx} deck={deck} />)}
          </div>
        </div>
      </div>
    );
  }
}