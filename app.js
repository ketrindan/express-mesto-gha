const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const {
  signInValidation,
  signUpValidation,
} = require('./middlewares/validation');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Произошла внутренняя ошибка сервера';

  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
