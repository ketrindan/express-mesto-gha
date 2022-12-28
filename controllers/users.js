const User = require('../models/user')

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      return;
    }
    res.send({ data: user })
  })
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then((user) => {
    if (!user) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.send({ data: user })
  })
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.params.id, { name, about })
  .then((user) => {
    if (!user) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.send({ data: user })
  })
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.params.id, { avatar })
  .then((user) => {
    if (!user) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.send({ data: user })
  })
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}