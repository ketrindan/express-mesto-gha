const Card = require('../models/card')

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({ data: cards }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }

    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректный запрос' });
      return;
    }

    if (err.name === 'NotFoundError') {
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      return;
    }

    res.status(500).send({ message: 'Произошла ошибка' })
  });
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner: owner })
  .then((card) => {
    res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }

    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректный запрос' });
      return;
    }

    if (err.name === 'NotFoundError') {
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      return;
    }

    res.status(500).send({ message: 'Произошла ошибка' })
  });
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }

    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректный запрос' });
      return;
    }

    if (err.name === 'NotFoundError') {
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      return;
    }

    res.status(500).send({ message: 'Произошла ошибка' })
  });
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.cardId } },
    { new: true, runValidators: true },
  )
  .then((card) => {
    res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }

    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректный запрос' });
      return;
    }

    if (err.name === 'NotFoundError') {
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      return;
    }

    res.status(500).send({ message: 'Произошла ошибка' })
  });
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.cardId } },
    { new: true, runValidators: true },
  )
  .then((card) => {
    res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }

    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Некорректный запрос' });
      return;
    }

    if (err.name === 'NotFoundError') {
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      return;
    }

    res.status(500).send({ message: 'Произошла ошибка' })
  });
}
