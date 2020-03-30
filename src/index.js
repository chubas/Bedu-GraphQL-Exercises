'use strict';

import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const APP_MONGO_URI = process.env.APP_MONGO_URI;
if (!APP_MONGO_URI) {
  throw 'Variable APP_MONGO_URI is not defined';
}

const app = express();

// Route handler for root path
app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

mongoose.connect(APP_MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log('Connected to MongoDB');
  app.listen(8080, () => {
    console.log('Express server listening at localhost:8080');
  });
});