const User = require('../models/user');
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  NTERNAL_SERVER_ERROR,
  CREATED_RESPONSE,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  NTERNAL_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(NTERNAL_SERVER_ERROR).send({ message: NTERNAL_ERROR_MESSAGE });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
        return;
      }
      res.status(NTERNAL_SERVER_ERROR).send({ message: NTERNAL_ERROR_MESSAGE });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(CREATED_RESPONSE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
        return;
      }

      res.status(NTERNAL_SERVER_ERROR).send({ message: NTERNAL_ERROR_MESSAGE });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
        return;
      }

      if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
        return;
      }

      res.status(NTERNAL_SERVER_ERROR).send({ message: NTERNAL_ERROR_MESSAGE });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
        return;
      }

      if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
        return;
      }

      res.status(NTERNAL_SERVER_ERROR).send({ message: NTERNAL_ERROR_MESSAGE });
    });
};
