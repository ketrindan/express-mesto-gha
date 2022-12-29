const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '63ac81570f126d308701bf28'
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req, res) => res.status(404).send({ message: 'Страница не найдена' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
