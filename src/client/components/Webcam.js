import React, { Component, PropTypes } from 'react';
import ConversationContainer from './ConversationContainer.js';
import fetch from 'isomorphic-fetch';

class Webcam extends Component {
  constructor(props) {
    super(props);
    console.log('this', this.context);
    const ownedID = this.props.location.pathname.split('/');
    this.state = {
      ownerID: `${ownedID[ownedID.length - 1]}0`,
      renderConvoContainer: false,
      conversationsClient: undefined,
      activeConversation: undefined,
      previewMedia: undefined,
      identity: undefined,
      message: undefined,
    };

    this.handleInvite = this.handleInvite.bind(this);
    this.handlePreview = this.handlePreview.bind(this);

    const webcam = this;

    // Ajax request to server to get token
    const path = this.props.location.pathname.split('/');
    const query = path[path.length - 1];
    fetch(`/api/token?identity=${query}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(data => {
        console.log('response', data);

        const identity = data.identity;
        const accessManager = new Twilio.AccessManager(data.token);

        // Check the browser console to see identity
        console.log(identity);

        // Create a Conversations Client and connect to Twilio
        const conversationsClient = new Twilio.Conversations.Client(accessManager);

        webcam.setState({ identity, conversationsClient });

        conversationsClient.listen().then(webcam.clientConnected.bind(webcam), error => {
          webcam.log(`Could not connect to Twilio: ${error.message}`);
          console.log(error, '<<< client could not connect');
        });
      });
  }

  componentWillUnmount() {
    const conversation = this.props.conversation;
    conversation.localMedia.stop();
    conversation.disconnect();
  }

  clientConnected() {
    // document.getElementById('invite-controls').style.display = 'block';
    console.log(`Connected. Listening as "${this.state.conversationsClient.identity}"`);
    const webcam = this;
    // When conversationClient hears 'invite' event, accept the invite event and start conversation
    this.state.conversationsClient.on('invite', invite => {
      webcam.log(`Incoming invite from: ${invite.from}`);
      invite.accept().then(webcam.conversationStarted.bind(webcam));
    });
  }

  log(message) {
    this.setState({ message });
    console.log(`WEBCAM MESSAGE: ${message}`);
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
    const inviteTo = document.getElementById('invite-to').value;

    if (this.state.activeConversation) {
      this.state.activeConversation.invite(inviteTo);
    } else {
      const options = {};
      if (this.state.previewMedia) {
        options.localMedia = this.state.previewMedia;
      }
      const webcam = this;
      this.state.conversationsClient.inviteToConversation(inviteTo, options)
        .then(webcam.conversationStarted.bind(webcam), error => {
          console.error('Unable to create conversation', error);
        });
    }
  }

  handlePreview() {
    if (!this.state.previewMedia) {
      const preview = new Twilio.Conversations.LocalMedia();
      Twilio.Conversations.getUserMedia()
        .then(mediaStream => {
          preview.addStream(mediaStream);
          preview.attach('#local-media');
        }, error => {
          console.error(`Unable to access local media ${error}`);
        });
      this.setState({ previewMedia: preview });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s7">
            <input
              type="button"
              id="button-preview"
              value="WebCam Preview"
              className="hvr-back-pulse"
              onClick={this.handlePreview}
            />
            <br />

            <input
              id="invite-to"
              type="text"
              value={this.state.ownerID}
              placeholder="Identity to send an invite to"
            />
            <input
              type="button"
              id="button-invite"
              className="hvr-back-pulse"
              onClick={this.handleInvite}
              value="Invite"
            />

            <p id="your-username">{this.state.identity}</p>
            <div id="local-media" className="local-webcam"></div>
            {(() => {
              switch (this.state.renderConvoContainer) {
                case true:
                  return (
                    <ConversationContainer
                      isOwner={this.state.ownerID === this.state.identity}
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
  location: PropTypes.string.isRequired,
  conversation: PropTypes.object.isRequired,
};

export default Webcam;
