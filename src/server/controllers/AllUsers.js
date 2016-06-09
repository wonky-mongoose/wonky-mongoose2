import User from '../models/User';

const get = (req, res) => {
  User.find({}).then((users) => {
    res.json(users);
  });
}

export default { get };