import { connect } from 'react-redux';
import SelectCard from '../components/SelectCard';
import { getCard } from '../actions';

const mapStateToProps = ({ decks, user, play, deck, cards, card }) => ({ decks, user, play, deck, cards, card });
const mapDispatchToProps = (dispatch) => ({
  selectCard: (cardId) => dispatch(selectCard(cardId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectCard);
