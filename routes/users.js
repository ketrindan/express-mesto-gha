const userRouter = require('express').Router();
const {
  getUsers, getUserById, updateUserProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  updateUserProfileValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

userRouter.get('/', getUsers);

userRouter.get('/:userId', getUserById);

userRouter.patch('/me', updateUserProfileValidation, updateUserProfile);

userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

userRouter.get('/me', getCurrentUser);

module.exports = userRouter;
