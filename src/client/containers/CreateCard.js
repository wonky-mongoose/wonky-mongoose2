import { connect } from 'react-redux';
import Flashcard from '../components/Flashcard';
import { postCard } from '../actions';

const mapStateToProps = ({ decks, user }) => ({ decks, user });
const mapDispatchToProps = (dispatch) => ({
  postCard: (question, answer, deckId, userId) => {
    dispatch(postCard(question, answer, deckId, userId));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);
