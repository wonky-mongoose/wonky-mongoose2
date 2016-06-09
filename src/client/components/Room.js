import React, { PropTypes } from 'react';
import Webcam from './Webcam';
import MessageApp from '../containers/MessageApp';
import Canvas from './Canvas';

class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h4 className="center grey-text text-darken-4">R O O M  4 2</h4>
          <Webcam location={this.props.location} className="col s12" />
          <MessageApp className="col m4 l4"/>
          <Canvas className="col m8 l8"/>
        </div>
      </div>
    );
  }
}

Room.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Room;
