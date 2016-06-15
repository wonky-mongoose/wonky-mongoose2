import React, { Component, PropTypes } from 'react';

class ConversationContainer extends Component {


  componentDidMount() {
    const conversation = this.props.conversation;

    conversation.on('participantConnected', participant => {
      participant.media.attach(this.refs.remoteMedia);
    });
  }

  componentWillUnmount() {
    const conversation = this.props.conversation;
    conversation.localMedia.stop();
    conversation.disconnect();
  }

  render() {
    return (
      <div id="webcam-displays col s12">
        {!this.props.isOwner ? <div ref="remoteMedia" className="media-container remote-webcam col s12"></div> : null}
      </div>
    );
  }
}

ConversationContainer.propTypes = {
  conversation: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default ConversationContainer;
