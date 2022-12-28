const User = require('../models/user')

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    res.status(200).send({ data: user })
  })
  .catch((err, user) => {
    if (!user) {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
    res.status(500).send({ message: 'Произошла ошибка' })
  });
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then((user) => {
    res.status(200).send({ data: user })
  })
  .catch((err, user) => {
    if (!user) {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Произошла ошибка' })
  });
}

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.params.userId, { name, about })
  .then((user) => {
    res.status(200).send({ data: user })
  })
  .catch((err, user) => {
    if (!user) {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Произошла ошибка' })
  });
}

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.params.userId, { avatar })
  .then((user) => {
    res.status(200).send({ data: user })
  })
  .catch((err, user) => {
    if (!user) {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Произошла ошибка' })
  });
}