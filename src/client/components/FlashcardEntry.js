import React from 'react';

export default class FlashcardEntry extends React.Component {
  constructor(props) {
    super(props);

    console.log('inside flashentry', props);
  }

  render() {
    return (
      <li className='card grey lighten-3 list-spacing'>
       <div>Question: {this.props.card.answer.explanation}</div>
       <div>Answer: {this.props.card.answer.text}</div>
       <div>Explanation: {this.props.card.question.text}</div>
      </li>
    );
  }
}
