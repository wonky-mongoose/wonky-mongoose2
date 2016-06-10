import React, { PropTypes } from 'react';
import io from 'socket.io-client';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';

export default class MessageApp extends React.Component { 

  constructor(props) {
  	super(props);
    this.socket = io.connect();
  	this.socket.on('chat message', this.recieveMessage.bind(this));
    
    this.users = [];
    this.getUsers = this.getUsers.bind(this);
    this.msgPic;
    this.msgName;
    this.isThisMyPic = this.isThisMyPic.bind(this);
    this.isThisMyName = this.isThisMyName.bind(this);
    this.isThisMyText = this.isThisMyText.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

  	this.state = {
  	  messages: []
  	}
    this.displayMSG = [];

    console.log('alex?', this.props.user)
  };

  componentWillMount() {
      console.log(this.users)
      this.getUsers();

  };

  recieveMessage(message) {
  	console.log(this.state)
  	let messages = this.state.messages;
  	this.setState({
  	  messages: messages.concat(message)
  	});
    this.scrollToBottom();
  };

  sendMessage(e) {
  if ( this.refs.inputfield.value !== '' ) {
    this.socket.emit('chat message', {user: this.props.user.name, text: this.refs.inputfield.value});
    this.refs.inputfield.value = '';
  }
  e.preventDefault();     
  };

  getUsers() {
    fetch('/api/allusers')
      .then(response => response.json())
      .then(user => {
        this.users.push(user);
        console.log(this.users);
      })

  }

  isThisMyPic(name) {
    return name === this.props.user.name ? 'right profilepic col s3' : 'profilepic col s3';
  }

  isThisMyName(name) {
    return name === this.props.user.name ? 'right profilename' : 'profilename';
  }

  isThisMyText(name) {
    return name === this.props.user.name ? 'right messagetext card-panel cyan darken-1 col s11' : 'messagetext card-panel cyan darken-3 col s11';
  }
  
  scrollToBottom() {
    let height = 0;
    $('div.message').each((i, value) => {
      height += parseInt($(value).height());
    });
    height += '';
    $('div.messagebody').animate({scrollTop: height});
  }

  render() {

    this.displayMSG = [];
    this.state.messages.forEach((msg) => {
      msg.user === this.currentUser ? this.hideUser = true : this.hideUser = false;
      this.displayMSG.push({
        user: msg.user,
        text: msg.text,
        hide: this.hideUser
      })
      this.currentUser = msg.user;
    })
    this.currentUser = '';

  return (
  <div>
    <div className="row">
      <div className="messenger card col s12 m4 l4">
        <nav className='activator'>
          <div className="nav-wrapper cyan">
              <span className='card-title activator'><a className='contactsbtn right'><i className="material-icons">contacts</i></a></span>
          </div>
        </nav>

       <div className="activator cardbody card-content grey lighten-4">
      <div className='no-margin card-content row'>
        <div className='cardbody'>
          <div className='messagebody'>
            {this.displayMSG.map((message) => {
              return (
                <div className='message col s12'>
                  <div className='message-whitespace' hidden={message.hide}></div>
                  <div className='message-details' hidden={message.hide}>
                    <div className={this.isThisMyPic(message.user)} hidden={message.hide}><img src='http://bit.ly/1PgP9cx'/></div>
                    <div className='username col s9' hidden={message.hide}><p className={this.isThisMyName(message.user)}>{message.user}</p></div>
                  </div>
                  <div className={this.isThisMyText(message.user)}>{message.text}</div>
               </div>
              )
            })}
          </div>

          <div className='card-action message inputfield col s12'>
            <div className='profilepic col s2'><img src='http://bit.ly/1PgP9cx'/></div>
            <form className='col s10' onSubmit={(e) => {this.sendMessage(e)}}>
              <input className='' ref='inputfield'/>
            </form>
          </div>


        </div>
      </div>
      </div>

        <div className='card-reveal'>
          <span className='card-title'>Classmates<i className="material-icons right">close</i></span>
          {JSON.stringify(this.users)}
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

