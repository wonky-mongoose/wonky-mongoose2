import { connect } from 'react-redux';
import Decks from '../components/Decks';
import { postDeck } from '../actions';

const mapStateToProps = ({ decks, user }) => ({ decks, user });
const mapDispatchToProps = (dispatch) => ({
  postDeck: (name, userId) => {
    dispatch(postDeck(name, userId));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Decks);
