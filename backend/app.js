require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const CustomError = require('./utils/CustomError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorParser } = require('./middlewares/errorParser');

const options = {  
  origin: [
    "http://ilya.nomoredomains.club",
    "https://ilya.nomoredomains.club",
    "http://localhost:3000"
  ],  
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],  
  preflightContinue: false,
  optionsSuccessStatus: 204,  
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],  
  credentials: true,
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

const app = express();
app.listen(PORT);

app.use('*', cors(options));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .regex(/^https?:\/\/(www\.)?[a-zA-Z0-9@:%._+~#=]{2,256}\.([a-z]{2,6})([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)#?$/),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use('/', () => {
  throw new CustomError(404, 'Ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use(errorParser);
