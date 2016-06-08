var ChatSchema = mongoose.Schema({
  created: Date,
  content: String,
  username: String,
  room: String
});

var Chat = mongoose.model('Chat', ChatSchema);
