require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const cors = require('./middlewares/cors');
const { celebrate, Joi, errors } = require('celebrate');
const ServerErrorHandler = require('./middlewares/ServerErrorHandler');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;
app.use(cors);
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/^:?https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(2).max(30).email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);
app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);
 app.use('*', auth, (req, res, next) => {
   next(new NotFoundError('Страницы не существует'));
   return;
 });
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(ServerErrorHandler);
app.listen(PORT, () => {
  console.log(`Сервер запущен ${PORT}`);
});