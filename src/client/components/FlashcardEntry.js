import React from 'react';

export default class FlashcardEntry extends React.Component {
  constructor(props) {
    super(props);

    console.log('inside flashentry', props);
  }
  deleteCard() {
    this.props.deleteCard(this.props.card._id);
    console.log('HERE IS MY ID FOR CARD', this.props.card._id)
  }
  render() {
    return (
      <div>
        <button onClick={this.deleteCard.bind(this)} className="btn orange lighten-3">
        Delete
        </button>
        <li className='card grey lighten-3 list-spacing'>
         <div>Question: {this.props.card.answer.explanation.slice(1, -1)}</div>
         <div>Answer: {this.props.card.answer.text.slice(1, -1)}</div>
         <div>Explanation: {this.props.card.question.text.slice(1, -1)}</div>
        </li>
      </div>
    );
  }
}
