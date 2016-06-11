import React from 'react';

export default class FlashcardEntry extends React.Component {
  constructor(props) {
    super(props);

    console.log('inside flashentry works', props);
  }

  render() {
    return (
      <div>
        <li>
         <div>{this.props.card.answer.explanation}</div>
         <div>{this.props.card.question.text}</div>
        </li>
      </div>
    );
  }
}
