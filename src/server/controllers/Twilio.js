import fetch from 'isomorphic-fetch';
import twilio from 'twilio';

const AccessToken = twilio.AccessToken;
const ConversationsGrant = AccessToken.ConversationsGrant;

const getToken = (req, res) => {
  fetch('/api/token')
}

export default { getToken };