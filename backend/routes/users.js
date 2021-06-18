const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();

const {
  getUsers,
  getUser,
  getMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().length(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^https?:\/\/(www\.)?[a-zA-Z0-9-@:%._+~#=]{2,256}\.([a-z]{2,6})([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)#?$/).required(),
  }),
}), updateAvatar);

module.exports = router;
