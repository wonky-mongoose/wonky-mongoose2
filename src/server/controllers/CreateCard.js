import Card from '../models/Card';

const post = (req, res) => {
  Card.create({
    question: req.body.question,
    answer: req.body.answer,
    deckId: req.body.deckId,
    userId: req.user._id,
  })
  .then(newCard => {
    res
      .status(201)
      .type('json')
      .json(newCard);
  })
  .catch(error => {
    res
      .status(500)
      .type('json')
      .json({ error });
  });
};

export default { post };
