import Deck from '../models/Deck';

const post = (req, res) => {
  Deck.create({
    name: req.body.name
  })
  .then(newDeck => {
    console.log('this is post data', newDeck);
    res
      .status(201)
      .type('json')
      .json(newDeck);

  })
  .catch(error => {
    res
      .status(500)
      .type('json')
      .json({ error });
  });
};
export default { post };
