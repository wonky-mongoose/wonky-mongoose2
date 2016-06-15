import Card from '../models/Card';

const deleteCard = (req, res) => {
  console.log(req.body);
  Card.remove({
    _id: req.params.cardId
  }).then((card) => {
    res
      .status(200)
      .type('json')
      .json(card);
  });
};

const selectCard = (req, res) => {
  console.log(req.body);
  Card.find({
    _id: req.params.cardId
  }).then((card) => {
    res
      .status(200)
      .type('json')
      .json(card);
  });
};


export default { deleteCard, selectCard };
