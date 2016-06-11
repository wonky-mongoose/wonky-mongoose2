import React, { Component, PropTypes } from 'react';
import { selectDeck, deleteDeck, getFlashcards } from '../actions';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import DeckLastPlayed from './DeckLastPlayed';
//import 'materialize-css/js/jquery-2.1.1.min.js'; 
//import 'materialize-css/js/materialize.js';

const mapDispatchToState = (dispatch) => ({
  setDeckState: (deck) => dispatch(selectDeck(deck)),
  deleteDeck: (deckId) => dispatch(deleteDeck(deckId)),
});
const mapStateToProps = ({ decks, user, cards }) => ({ decks, user, cards });


class DeckItem extends Component {
  constructor(props) {
    super(props);
    console.log('THESE ARE PROPS INSIDE DECKITEM', props);
    this.chooseDeckToStudy = this.chooseDeckToStudy.bind(this);
    this.state = {
      lastPlayedAt: '',
    };
    // console.log('THIS IS DECK ID', this.props.deck._id, this.props.getFlashcards);
    // console.log('THESE ARE FLASHCARDS',this.props.getFlashcards(this.props.deck._id));
  }

  componentWillMount() {
    fetch(`/api/last-play/deck/${this.props.deck._id}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(play => {
        this.setState({
          lastPlayedAt: (play && play.createdAt) || '',
        });
      });
  }

  chooseDeckToStudy() {
    this.props.setDeckState(this.props.deck);
    browserHistory.push(`/flash/decks/${this.props.deck._id}/study`);
  }

  deleteDeck() {
    this.props.deleteDeck(this.props.deck._id);
  }

  getCards() {
    // this.props.getFlashcards(this.props.deck._id);
    console.log('flashies has been clicked!!!', );
    browserHistory.push(`/flash/decks/${this.props.deck._id}/flashcards`);
  }


  render() {

    return (
      <div>
        <div className="card-item">
          <div className="card-panel hoverable">
            <div className="card-content">
              <i className="material-icons" onClick={(e)=>{$('#modal1').openModal()}} href="#modal1" >delete</i>
              <div className="card-title grey-text text-darken-4 center">
                <strong>{this.props.deck.name}</strong>
              </div>
              <DeckLastPlayed date={this.state.lastPlayedAt} />
              <ProgressBar deck={this.props.deck} />
              <div className="center">
                <button onClick={this.chooseDeckToStudy} className="btn cyan lighten-3">
                  Study
                </button>
                <button onClick={this.getCards.bind(this)} className="btn orange lighten-3">
                  get flashies
                </button>
                <button onClick={this.deleteDeck.bind(this)} className="btn orange lighten-3">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h3>Delete Deck</h3>
            <p>Do you really want to delete this deck?</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">No</a>
            <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Yes</a>
            
          </div>
        </div>
      </div>
    );
  }
}

DeckItem.propTypes = {
  deck: PropTypes.object.isRequired,
  setDeckState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToState)(DeckItem);
