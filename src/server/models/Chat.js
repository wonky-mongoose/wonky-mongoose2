import mongoose from '../db';

const ChatSchema = mongoose.Schema({
  created: Date,
  content: String,
  username: String,
  room: String
});

const Chat = mongoose.model('Chat', ChatSchema);
