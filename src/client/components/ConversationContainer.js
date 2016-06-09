import React from 'react';

class ConversationContainer extends React.Component {


  componentDidMount() {
    const conversation = this.props.conversation;
    conversation.localMedia.attach(this.refs.localMedia);

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
      <div id="webcam-displays">
        {!this.props.isOwner ? <div ref='remoteMedia' className='media-container remote-webcam'></div> : null}
        {this.props.isOwner ? <div ref='localMedia' className='media-container local-webcam'></div>: null}
      </div>  
    );
  }
}

export default ConversationContainer;