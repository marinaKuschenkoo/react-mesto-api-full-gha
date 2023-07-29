/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const ValidationError = require('../errors/ValidationError');
const { secret } = require('../constants');
const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ValidationError('Необходима авторизация!');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token,  NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',);
  } catch (error) {
    throw new ValidationError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
