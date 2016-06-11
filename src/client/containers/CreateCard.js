import { connect } from 'react-redux';
import Flashcard from '../components/Flashcard';
import { postCard, getFlashcards } from '../actions';

const mapStateToProps = ({ decks, user, play, deck, cards }) => ({ decks, user, play, deck, cards });
const mapDispatchToProps = (dispatch) => ({
  postCard: (question, answer, deckId, userId) => {
    console.log('THIS IS DECKID', question);
    dispatch(postCard(question, answer, deckId, userId));
  },
  getFlashcards: (deckId) => {console.log('THIS IS DECKID', deckId); dispatch(getFlashcards(deckId))}
});
export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);
