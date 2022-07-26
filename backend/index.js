const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cardRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const stripe = require('./routes/stripe');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/products', productRoute);
app.use('/api/cards', cardRoute);
app.use('/api/orders', orderRoute);
app.use('/api', stripe);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
