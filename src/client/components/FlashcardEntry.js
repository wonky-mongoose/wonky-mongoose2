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
        <li>
                    <button onClick={this.deleteCard.bind(this)} className="btn orange lighten-3">
                Delete
              </button>
         <div>Question: {this.props.card.answer.explanation}</div>
         <div>Answer: {this.props.card.answer.text}</div>
         <div>Explanation: {this.props.card.question.text}</div>
        </li>
      </div>
    );
  }
}
