import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.load();

const AccessToken = twilio.AccessToken;
const ConversationsGrant = AccessToken.ConversationsGrant;
// Hold information for rooms
const rooms = {};

const getRoom = (req, res) => {
  res.status(200).type('json').json({
    doesExist: !!rooms[req.query.room],
  });
};

const getToken = (req, res) => {
  // Get room id and identity from parameters
  const identity = req.query.identity;
  const roomID = req.query.room;

  // Create a new room if it doesn't exist
  if (!rooms[roomID]) {
    rooms[roomID] = identity;
  }
  // Set the room owner
  const roomOwner = rooms[roomID];
  // Generate token
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token
  token.identity = identity;

  // Grant the access token Twilio Video capabilities
  const grant = new ConversationsGrant();
  grant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response
  res
    .status(200)
    .type('json')
    .json({
      ownerID: roomOwner,
      identity: identity,
      token: token.toJwt(),
    });
};

export default { getToken, getRoom };
