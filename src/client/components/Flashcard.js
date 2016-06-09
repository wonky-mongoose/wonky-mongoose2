import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import fetch from 'isomorphic-fetch';

class Flashcard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  };

  searchQuizlet() {
    var search = this.refs.input.value;

    // var context = this;
    var url = 'https://api.quizlet.com/2.0/search/sets/415?client_id=GFnmsfyN3r&whitespace=1&q=french';
    // fetch(url)
    //   .then(data => {
    //     console.log(data);
    //   })
    $.ajax({
      type: 'GET',
      url: url,
      // dataType: 'json',
      credentials: 'no-cors',
      origin: '*',
      header: {
        "Access-Control-Allow-Origin":"http://localhost:3000",
      },
      success: data => {
          console.log(data)
      },
      error: function(data) {
        console.log('error retrieving data');
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="center">Flashcards</h1>
        <div>
        Search: <input type="text" name="flash" ref="input"></input>
        <input type="submit" onClick={this.searchQuizlet.bind(this)}></input>
        </div>
      </div>
    );
  }
}

export default Flashcard;



