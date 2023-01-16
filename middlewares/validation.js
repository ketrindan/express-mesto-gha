const { celebrate, Joi } = require('celebrate');

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }),
});

const getUserIdValidation = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().length(24).alphanum(),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(/^https?:\/\/(www)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }),
});

const getCardIdValidation = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required().length(24).alphanum(),
  }),
});

module.exports = {
  signInValidation,
  signUpValidation,
  getUserIdValidation,
  updateUserProfileValidation,
  updateAvatarValidation,
  createCardValidation,
  getCardIdValidation,
};
