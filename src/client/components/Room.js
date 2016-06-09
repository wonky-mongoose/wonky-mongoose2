import React, { PropTypes } from 'react';
import paper, { Path, PaperScope, Color, Point} from 'paper';
import { throttle } from 'underscore';
import io from 'socket.io-client';
import MessageApp from '../containers/MessageApp';
import Canvas from './Canvas';

export default class Room extends React.Component {
  constructor(props) {
  	super(props);

  }

  render() {
    return (
      <div className='container'>
  	  <div className='row'>
  	  	<h4 className="center grey-text text-darken-4">R O O M  4 2</h4>
  	    <MessageApp className='col m4 l4'/>
  	    <Canvas className='col m8 l8'/>
  	  </div>
  	  </div>
    )
  }

}