import React from 'react';
import SearchSet from './SearchSet';
import SelectedSet from './SelectedSet';
import selectedSetEntry from './selectedSetEntry';

export default class SearchTopic extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      flashcardTopic: [],
      selectedFlashcards: []
    }
  }

  searchFSByTopic() {
    var topic = this.refs.input.value;
    $.ajax({
      type: 'GET',
      url: 'https://api.quizlet.com/2.0/search/sets?client_id=GFnmsfyN3r&whitespace=1&q=' + topic,
      dataType: 'jsonp',
      success: data => {
        console.log('THIS IS THE CALL RESULT for set', data.sets);
        this.setState({
          flashcardTopic: data.sets
        })
      },
      error: function(data) {
        console.log('error retrieving flashcard set');
      }
    });
  }

  selectedSet(id) {
    $.ajax({
      type: 'GET',
      url: 'https://api.quizlet.com/2.0/sets/' + id + '?client_id=GFnmsfyN3r&whitespace=1',
      dataType: 'jsonp',
      success: data => {
        console.log('this is')
        this.setState({
          selectedFlashcards: data.terms
        });
      },
      error: function(data) {
        console.log('error retrieving flashcard id');
      }
    });
  }

  render() {
  console.log('these are all of the images', this.state.selectedFlashcards);
    return (
      <div>
        Search: <input type="text" name="topic" ref="input"/>
        <input type="submit" onClick={this.searchFSByTopic.bind(this)}/>
        <SelectedSet selectedCards={this.state.selectedFlashcards}/>
        <SearchSet topics={this.state.flashcardTopic} selectedSet={this.selectedSet.bind(this)}/>
      </div>
    );
  }
}


