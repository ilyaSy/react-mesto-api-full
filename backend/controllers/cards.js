const Card = require('../models/card');
const CustomError = require('../utils/CustomError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(() => { throw Error('NoData'); })
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw Error('BadRules');
      }

      Card.findByIdAndRemove(cardId)
        .then((cardRemoved) => res.send(cardRemoved))
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new CustomError(400, 'Переданы некорректные данные');
          }
          throw new CustomError(500, 'На сервере произошла ошибка');
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.message === 'NoData') {
        throw new CustomError(404, 'Карточка не найдена');
      }
      if (err.message === 'BadRules') {
        throw new CustomError(403, 'У вас нет прав удалять карточки других пользователей');
      }
      throw new CustomError(500, 'На сервере произошла ошибка');
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .populate('owner')
    .populate('likes')
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.errors && err.errors.link) {
        throw new CustomError(400, err.errors.link.message);
      }
      if (err.message === 'NoData') {
        throw new CustomError(404, 'Карточка не найдена');
      } else if (err.name === 'CastError') {
        throw new CustomError(400, 'Переданы некорректные данные');
      }
      throw new CustomError(500, 'На сервере произошла ошибка');
    })
    .catch(next);
};

module.exports.toggleLikeCard = (req, res, next) => {
  const { cardId } = req.params;

  if (req.method === 'PUT') {
    Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .populate('owner')
      .populate('likes')
      .orFail(new Error('NoData'))
      .then((card) => res.send(card))
      .catch((err) => {
        if (err.message === 'NoData') {
          throw new CustomError(404, 'Карточка не найдена');
        } else if (err.name === 'CastError') {
          throw new CustomError(400, 'Переданы некорректные данные');
        }
        throw new CustomError(500, 'На сервере произошла ошибка');
      })
      .catch(next);
  } else if (req.method === 'DELETE') {
    Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
      .populate('owner')
      .populate('likes')
      .orFail(new Error('NoData'))
      .then((card) => res.send(card))
      .catch((err) => {
        if (err.message === 'NoData') {
          throw new CustomError(404, 'Карточка не найдена');
        } else if (err.name === 'CastError') {
          throw new CustomError(400, 'Переданы некорректные данные');
        }
        throw new CustomError(500, 'На сервере произошла ошибка');
      })
      .catch(next);
  }
};
