import React, { PropTypes } from 'react';
import io from 'socket.io-client';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';

export default class MessageApp extends React.Component { 

  constructor(props) {
  	super(props);
    this.socket = io.connect();
  	this.socket.on('chat message', this.recieveMessage.bind(this));

    this.getUsers = this.getUsers.bind(this);
    this.msgPic;
    this.msgName;
    this.isThisMyPic = this.isThisMyPic.bind(this);
    this.isThisMyName = this.isThisMyName.bind(this);
    this.isThisMyText = this.isThisMyText.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.users = {};

  	this.state = {
  	  messages: [],
      users: []
  	}

    
    this.displayMSG = [];

    this.socket.emit('room', this.props.location.pathname);
    // this.socket.on('chat history', this.recieveHistory.bind(this));
    console.log('props', props.location)
    console.log('this props', this.props.user['name'])

    this.socket.on('chat history', (data) => {
      console.log('History', data);
      data !== null ? this.state.messages = data : data;
    })
  };

  componentWillMount() {
    if( this.props.user['name'] !== null ) {
      this.socket.emit('user', this.props.user['name']);
      this.socket.on('user', (users) => {
        users.forEach((user) => {
          console.log(user);
          user!== null ? this.users[user] = 1 : user;
          this.setState({
            users: Object.keys(this.users)
          })
          console.log('users', this.state.users)
        })
      })
    }

    // this.getUsers().then(users => {
    //   //console.log('users', props.location.pathname);
    //   this.setState({
    //     users: users
    //   })
    // });
  };

  componentWillReceiveProps() {
    if( this.props.user['name'] !== null ) {
      this.socket.emit('user', this.props.user['name']);
      this.socket.on('user', (users) => {
        users.forEach((user) => {
          console.log(user)
          user!== null ? this.users[user] = 1 : user;
          this.setState({
            users: Object.keys(this.users)
          })
          console.log('users',this.state.users)
        })
      })
    }
  }

  recieveHistory(messages) {
    this.setState({
      messages: messages
    });
    console.log('history', messages)
    this.scrollToBottom();
  }

  recieveMessage(message) {
  	let messages = this.state.messages;
  	this.setState({
  	  messages: messages.concat(message)
  	});
    this.scrollToBottom();
  };

  sendMessage(e) {
    //console.log('location', this.props.location)
    if ( this.refs.inputfield.value !== '' ) {
      this.socket.emit('chat message', {
        user: this.props.user.name, 
        text: this.refs.inputfield.value, 
        classroom: this.props.location.pathname
      });
      this.refs.inputfield.value = '';
    }
    e.preventDefault();     
  };

  getUsers() {
    // return fetch('/api/allusers')
    //   .then(response => response.json());
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
      <div className="messenger card col s12">
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
          <ul id='classmates' className="collection">
            {this.state.users.map((user) => {
              return (
                <li id='classmate' className="collection-item avatar">
                  <img src="http://bit.ly/1PgP9cx" alt="" className="circle"/>
                  <span className="title">{user}</span>
                </li>
              )
            })}
          </ul>
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

