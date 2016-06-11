import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import fetch from 'isomorphic-fetch';
import FlashcardEntry from './FlashcardEntry';

class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in flashcard!!!', props);
    
  };

  handleSubmit (event) {
    event.preventDefault();
    var formData = {
      question: this.refs.question.value,
      answer: this.refs.answer.value,
    }

  }

  componentDidMount() {
    console.log('IM IN getFlashcards')
    this.props.getFlashcards(this.props.params.deckId);
    console.log('i got called!!!', this.props.cards);
  }


  render() {
    console.log('THESE ARE MY CARDS', this.props.cards)
   if(Array.isArray(this.props.cards)) {
        var cards = this.props.cards;
     } else {
       cards = [];
     }
     console.log('THESE ARE CARDS in flash', cards);
    return (
      <div className="container">
        <h1 className="center">Flashcards</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="question" />
          <input type="text" ref="answer" />
          <input type="submit" value="post new card"/>
        </form>
        <div>
          <ul>
            {cards.map((card, idx) => <FlashcardEntry key={idx} card={card} />)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Flashcard;





