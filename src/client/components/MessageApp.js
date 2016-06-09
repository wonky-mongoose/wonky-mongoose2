import React, { PropTypes } from 'react';
import io from 'socket.io-client';
//import AllUsers from '../../server/controllers/AllUsers';

export default class MessageApp extends React.Component { 

  constructor(props) {
  	super(props);
    this.socket = io.connect();
  	this.socket.on('chat message', this.recieveMessage.bind(this));

  	this.state = {
  	  messages: []
  	}
 
  };


  recieveMessage(message) {
  	console.log(this.state)
  	let messages = this.state.messages;
  	this.setState({
  	  messages: messages.concat(message)
  	});
  }



  sendMessage(e) {
 	if ( this.refs.inputfield.value !== '' ) {
	  this.socket.emit('chat message', {user: this.props.user.name, text: this.refs.inputfield.value});
	  this.refs.inputfield.value = '';
 	}
	e.preventDefault(); 		
  };

  
  render() {

  return (
  <div>
    <div className="row">
    <div className="card col s12 m4 l4">
      <nav>
        <div className="nav-wrapper cyan">
          <ul className="right hide-on-med-and-down">
            <li><a href="badges.html"><i className="material-icons">chat</i></a></li>
            <li><a href="badges.html"><i className="material-icons">contacts</i></a></li>      
        </ul>
        </div>
      </nav>
      <div className="card-content grey lighten-4">
        <div className='row'>
          <div className='message col s12 m12 l12'>
            <div className='profilepic col s3 m3 l3'><img src='http://bit.ly/1PgOA2n'/></div>
            <div className='username col s9 m9 l9'><strong>Sean</strong></div>
            <div className='card-panel cyan darken-3 col s11 m11 l11'>Say something</div>
          </div>
           <div className='message col s12'>
            <div className='profilepic col s1'><img src='http://bit.ly/1Y7VttI'/></div>
            <div className='username'><strong>Alex</strong></div>
            <div className='col s11 m11 l11 card-panel'><span>This is a link</span></div>
          </div>
           <div className='message col s12'>
            <div className='profilepic col s1'><img src='http://bit.ly/1OcG0XA'/></div>
            <div className='username'><strong>Lynn</strong></div>
            <div className='col s11 text-wrapper'>This is a link</div>
          </div>
           <div className='message col s12'>
            <div className='profilepic col s1'><img src='http://bit.ly/1PgP9cx'/></div>
            <div className='username'><strong>Chris</strong></div>
            <div className='col s11 text-wrapper'>This is a link</div>
          </div>

          {this.state.messages.map((message) => {
            return (
              <div className='message col s12'>
                <div className='profilepic col s1'><img src='http://bit.ly/1PgP9cx'/></div>
                <div className='username'><strong>{message.user}</strong></div>
                <div className='col s11 text-wrapper'>{message.text}</div>
              </div>
            )
          })}

          <div className='message inputfield col s12'>
            <div className='profilepic col s1'><img src='http://bit.ly/1PgP9cx'/></div>
            <form onSubmit={(e) => {this.sendMessage(e)}}>
              <input className='col s10' ref='inputfield'/>
              <button type='submit' onClick={(e) => {this.sendMessage(e)}}></button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>

  )

}
}

MessageApp.propTypes = {
  user: PropTypes.object
}
          // <ul className="left hide-on-med-and-down">
          //   <li><div className='profilepic'><img src='http://bit.ly/1PgOA2n'/></div></li>
          // </ul>
