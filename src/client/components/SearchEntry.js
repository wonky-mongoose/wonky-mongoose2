import React from 'react';

export default class SearchEntry extends React.Component {
  constructor(props) {
    super(props);

    console.log('inside SearchEntry', props);
  }

  render() {
    return (
      <div>
          <button onClick={()=> this.props.selectedSet(this.props.flashcard.id)}></button>
          <li>Title: {this.props.flashcard.title}</li>
          <p>Description: {this.props.flashcard.description}</p>
      </div>
    );
  }
}