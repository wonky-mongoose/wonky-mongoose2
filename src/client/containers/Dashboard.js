import { connect } from 'react-redux';
import Decks from '../components/Decks';
import { postDeck, getFlashcards } from '../actions';

const mapStateToProps = ({ decks, user, cards }) => ({ decks, user, cards });
const mapDispatchToProps = (dispatch) => ({
  postDeck: (name, userId) => {
    dispatch(postDeck(name, userId));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Decks);
