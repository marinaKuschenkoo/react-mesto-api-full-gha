/* eslint-disable no-useless-escape */
/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, setLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .regex(/^(https?:\/\/)?([a-z0-9-]+\.)*[a-z0-9-]+\.[a-z]{2,}\/?([^\s]*)$/),
    }),
  }),
  createCard,
);
router.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard,
);
router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  setLike,
);
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteLike,
);

module.exports = router;
