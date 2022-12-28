const Card = require('../models/card')

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({ data: cards }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createCard = (req, res) => {
  console.log(req.user._id);

  const { name, link } = req.body;

  Card.create({ name, link })
  .then((card) => {
    res.status(200).send({ data: card })
  })
  .catch((err, card) => {
    if (!card) {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Произошла ошибка' })
  });
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    res.status(200).send({ data: card })
  })
  .catch((err, card) => {
    if (!card) {
      return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    }
    res.status(500).send({ message: 'Произошла ошибка' })
  });
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.cardId } },
    { new: true },
  )
  .then((card) => {
    res.status(200).send({ data: card })
  })
  .catch((err, card) => {
    if (!card) {
      return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    }
    res.status(500).send({ message: 'Произошла ошибка' })
  });
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.cardId } },
    { new: true },
  )
  .then((card) => {
    res.status(200).send({ data: card })
  })
  .catch((err, card) => {
    if (!card) {
      return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    }
    res.status(500).send({ message: 'Произошла ошибка' })
  });
}
