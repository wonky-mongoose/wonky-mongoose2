import { connect } from 'react-redux';
import Webcam from '../components/Webcam';

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Webcam);
