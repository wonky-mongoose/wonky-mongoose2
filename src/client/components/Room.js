import React, { PropTypes } from 'react';
import Webcam from './Webcam';
import MessageApp from '../containers/MessageApp';
import Canvas from './Canvas';

const Room = (props) => (
  <div className="">
    <div className="row">
      <h4 className="center grey-text text-darken-4">R O O M  4 2</h4>
      <div className="col s3">
        <Webcam location={props.location} className="col s12" />
        <MessageApp className="col s12" />
      </div>
      <div className="col s9">
        <Canvas className="col s12" />
      </div>
    </div>
  </div>
);

Room.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Room;
