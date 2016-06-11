import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import fetch from 'isomorphic-fetch';
import FlashcardEntry from './FlashcardEntry';

class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in flashcard!!!!!!!!!!', props);
  };

  handleSubmit (event) {
    event.preventDefault();
    var formData = {
      question: this.refs.question.value,
      answer: this.refs.answer.value,
    }
  }

  componentWillMount() {
    this.props.getFlashcards(this.props.params.deckId);
  }

  // componentWillReceiveProps(nextProps) {
  //  this.props.cards = nextProps.props.cards;
  //  this.render();
  // }

  render() {
    if(Array.isArray(this.props.cards)) {
       var cards = this.props.cards;
    } else {
      cards = [];
    }
    console.log(this.props.cards);
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





