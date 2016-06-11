/* eslint-disable no-console */
/* global Twilio */
import React, { Component, PropTypes } from 'react';
import ConversationContainer from './ConversationContainer.js';
import fetch from 'isomorphic-fetch';

class Webcam extends Component {
  constructor(props, { user }) {
    super(props);
    
    const ownedID = this.props.location.pathname.split('/');
    this.state = {
      ownerID: undefined,
      renderConvoContainer: false,
      conversationsClient: undefined,
      activeConversation: undefined,
      previewMedia: undefined,
      identity: encodeURIComponent(`${this.props.user.name}.${props.user._id}`),
      message: undefined,
      shouldConnect: true,
    };
    this.handleInvite = this.handleInvite.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.initConnection = this.initConnection.bind(this);
  }

  componentWillMount() {
    if(this.props.user.name){
      this.initConnection(`${this.props.user.name}.${this.props.user._id}`);
    }
  }

  componentWillUnmount() {
    const conversation = this.props.conversation;
    if(conversation) {
      conversation.localMedia.stop();
      conversation.disconnect();
    }
  }


  clientConnected() {
    // document.getElementById('invite-controls').style.display = 'block';
    console.log(`Connected. Listening as "${this.state.conversationsClient.identity}"`);
    const webcam = this;
    // When conversationClient hears 'invite' event, accept the invite event and start conversation
    this.state.conversationsClient.on('invite', invite => {
      const username = (invite.from.split('.'))[0];
      webcam.log(`Incoming invite from: ${invite.from}`);
      Materialize.toast(`${username} is joining ...`, 3000);
      invite.accept().then(webcam.conversationStarted.bind(webcam));
    });
  }

  log(message) {
    this.setState({ message });
    console.log(`WEBCAM MESSAGE: ${message}`);
  }

  initConnection(identity) {
    console.log('asdfadsflkj');
    const webcam = this;
    if (!identity) {
      Materialize.toast('Error Connecting... Please refresh', 5000);
    } else {
      Materialize.toast('Successfully Connected!', 3000);
    }
    // Ajax request to server to get token
    const path = this.props.location.pathname.split('/');
    const query = path[path.length - 1];
    fetch(`/api/token?identity=${identity}&room=${query}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(data => {
        const identity = data.identity;
        const ownerID = data.ownerID;
        const accessManager = new Twilio.AccessManager(data.token);

        // Check the browser console to see identity
        console.log(identity);

        // Create a Conversations Client and connect to Twilio
        const conversationsClient = new Twilio.Conversations.Client(accessManager);

        webcam.setState({ identity, conversationsClient, ownerID });

        conversationsClient.listen().then(webcam.clientConnected.bind(webcam), error => {
          webcam.log(`Could not connect to Twilio: ${error.message}`);
          console.log(error, '<<< client could not connect');
          Materialize.toast('Unable to Connect', 3000);
        });
      });
  }

  conversationStarted(conversation) {
    const webcam = this;

    this.setState({ activeConversation: conversation });
    // Draw local video, if not already previewing
    this.setState({ renderConvoContainer: true });

    // When a participant joins, draw their video on screen
    webcam.state.activeConversation.on('participantConnected', participant => {
      webcam.log(`Participant ${participant.identity} connected`);
      webcam.setState({ renderConvoContainer: true });
    });

    // When a participant disconnects, note in log
    webcam.state.activeConversation.on('participantDisconnected', participant => {
      webcam.log(`Participant ${participant.identity} disconnected`);
      webcam.setState({ renderConvoContainer: false });
    });

    // When the conversation ends, stop capturing local video
    webcam.state.activeConversation.on('disconnected', () => {
      webcam.log(`Connected. Listening as '${webcam.state.conversationsClient.identity}'`);
      webcam.setState({
        renderConvoContainer: false,
        activeConversation: null,
        previewMedia: null,
      });
    });
  }

  handleInvite() {
    const inviteTo = this.state.ownerID;
    const ownerName = (inviteTo.split('.'))[0];
    
    if (!this.state.activeConversation) {
      Materialize.toast(`Joining ${ownerName} ...`, 3000);
      const options = {};
      if (this.state.previewMedia) {
        options.localMedia = this.state.previewMedia;
      }
      const webcam = this;
      this.state.conversationsClient.inviteToConversation(inviteTo, options)
        .then(webcam.conversationStarted.bind(webcam), error => {
          Materialize.toast(`Unable to join ${ownerName}`, 3000);
          console.error('Unable to create conversation', error);
        });
    }
  }

  handlePreview() {
    if (!this.state.previewMedia) {
      Materialize.toast('Opening your webcam ...', 3000);
      const preview = new Twilio.Conversations.LocalMedia();
      Twilio.Conversations.getUserMedia()
        .then(mediaStream => {
          preview.addStream(mediaStream);
          preview.attach('#local-media');
        }, error => {
          Materialize.toast('Please check if your camera is working.', 3000);
          console.error(`Unable to access local media ${error}`);
        });
      this.setState({ previewMedia: preview });
    }
  }

  componentWillReceiveProps(props) {
    if(this.props.user.name){
      this.initConnection(`${props.user.name}.${props.user._id}`);
    }
  }

  render() {
    const isOwner = (this.state.ownerID === this.state.identity);
    return (
      <div className="">
        <div className="row">
          <div className="col s12">
            {(() => {
              switch (isOwner) {
                case true:
                  return (
                    <div className="center-align">
                      <input
                        type="button"
                        id="button-preview"
                        value="WebCam Preview"
                        className="waves-effect waves-light btn"
                        onClick={this.handlePreview}
                      />
                      <div id="local-media"></div>
                    </div>
                  );
                case false:
                  return (
                    <div className="center-align">
                      <input
                        type="button"
                        id="button-invite"
                        className="waves-effect waves-light btn"
                        onClick={this.handleInvite}
                        value="Join Broadcast"
                      />
                    </div>
                  );
                default: 
                  return null;
              }
            })()}

            {(() => {
              switch (this.state.renderConvoContainer) {
                case true:
                  return (
                    <ConversationContainer
                      isOwner={isOwner}
                      conversation={this.state.activeConversation}
                    />
                  );
                case false:
                  return null;
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}

Webcam.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object.isRequired,
};

export default Webcam;
