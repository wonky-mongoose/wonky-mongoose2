import React from 'react';
import SearchEntry from './SearchEntry';

export default class SearchSet extends React.Component {
  constructor(props) {
    super(props);

    console.log('inside searchset', props.topics);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.topics.map((flashcard, index) => {
            return (
              <SearchEntry key={index} flashcard={flashcard} selectedSet={this.props.selectedSet}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}