import { connect } from 'react-redux';
import MessageApp from '../components/MessageApp';

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(MessageApp);
