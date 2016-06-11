import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import fetch from 'isomorphic-fetch';
import FlashcardEntry from './FlashcardEntry';

class Flashcard extends React.Component {
  constructor(props) {
    super(props);    
  };

  handleSubmit (event) {
    event.preventDefault();
    var formData = {
      question: this.refs.question.value,
      explanation: this.refs.explanation.value,
      text: this.refs.text.value
    }
    this.props.postCard(this.refs.question.value, this.refs.explanation.value, this.refs.text.value, this.props.params.deckId, this.props.user._id);
    this.refs.question.value = '';
    this.refs.explanation.value = '';
    this.refs.text.value = '';
  }

  componentDidMount() {
    this.props.getFlashcards(this.props.params.deckId);
  }


  render() {
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
          <input type="text" ref="question" placeholder="Question"/>
          <input type="text" ref="explanation" placeholder="Answer"/>
          <input type="text" ref="text" />
          <input type="submit" value="post new card" placeholder="Explanation"/>
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





