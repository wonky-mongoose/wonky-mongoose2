import Deck from '../models/Deck';

import getCard from '../services/DeckProgress';
import getProgress from '../services/ProgressBar.js';

const findAll = (req, res) => {
  Deck.find({}).then((decks) => {
    res
      .status(200)
      .type('json')
      .json(decks);
  });
};

const findNextCard = (req, res) => {
  getCard(req.body.deckId, req.user._id).then(card => {
    res
      .status(200)
      .type('json')
      .json(card);
  });
};

const progress = (req, res) => {
  getProgress(req.body.deckId, req.user._id).then(percentage => {
    res
      .status(200)
      .type('json')
      .json(percentage);
  });
};

const deleteDeck = (req, res) => {
  Deck.remove({
    _id: req.params.deckId
  }).then((deck) => {
    res
      .status(200)
      .type('json')
      .json(deck);
  });
};

export default { findAll, findNextCard, progress, deleteDeck };
