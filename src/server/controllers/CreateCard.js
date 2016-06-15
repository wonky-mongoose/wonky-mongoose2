import Card from '../models/Card';

const post = (req, res) => {
  console.log('I  M INSIDE CREATE CARD', req.body);
  Card.create({
    question: {
      text: req.body.question
    },
    answer: {
      text: req.body.text,
      explanation: req.body.explanation
    },
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
