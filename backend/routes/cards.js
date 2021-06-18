const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  toggleLikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .regex(/^https?:\/\/(www\.)?[a-zA-Z0-9@:%._+~#=]{2,256}\.([a-z]{2,6})([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)$/)
        .required(),
    }),
  }),
  createCard,
);

router.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().required().length(24),
    }),
  }),
  deleteCard,
);

router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().required().length(24),
    }),
  }),
  toggleLikeCard,
);

router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().required().length(24),
    }),
  }),
  toggleLikeCard,
);

module.exports = router;
