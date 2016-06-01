import React from 'react';
import $ from 'jquery';

class Play extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showQuestion: false,
      showAnswer: false,
      currentCard: '',
      currentDeck: [],
      plays: []
    }
  }

  componentDidMount() {
    this.getDeck()
  }

  getDecks() {
    $.getJSON(`/api/decks/${this.props.params.id}`).done((deck) => {
      this.setState({ currentDeck: deck });
    });
  }
  
  render() {
    return(
      <div>
        <h1>{this.state.currectDeck.name}</h1>
        <p>Description of Deck</p>
        <button>Go</button>
      </div>
    )
  }
}