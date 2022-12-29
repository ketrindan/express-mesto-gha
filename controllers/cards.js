const Card = require('../models/card');
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  NTERNAL_SERVER_ERROR,
  CREATED_RESPONSE,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  NTERNAL_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(NTERNAL_SERVER_ERROR).send({ message: NTERNAL_ERROR_MESSAGE });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CREATED_RESPONSE).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
        return;
      }

      res.status(NTERNAL_SERVER_ERROR).send({ message: NTERNAL_ERROR_MESSAGE });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
        return;
      }
      res.status(NTERNAL_SERVER_ERROR).send({ message: NTERNAL_ERROR_MESSAGE });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.cardId } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
        return;
      }

      res.status(NTERNAL_SERVER_ERROR).send({ message: NTERNAL_ERROR_MESSAGE });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.cardId } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
        return;
      }

      res.status(NTERNAL_SERVER_ERROR).send({ message: NTERNAL_ERROR_MESSAGE });
    });
};
