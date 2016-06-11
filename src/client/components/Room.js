import React, { PropTypes } from 'react';
import Webcam from '../containers/Webcam';
import MessageApp from '../containers/MessageApp';
import Canvas from './Canvas';
import io from 'socket.io-client';

const Room = (props) => (
  <div className="">
    <div className="row">
      <h4 className="center grey-text text-darken-4">R O O M</h4>
      <div className="col s3">
        <Webcam location={props.location} className="col s12" />
        <MessageApp location={props.location} className="col s12" />
      </div>
      <div className="col s9">
        <Canvas location={props.location} className="col s12" />
      </div>
    </div>
  </div>
);

Room.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Room;
