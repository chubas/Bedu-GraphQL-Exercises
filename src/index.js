'use strict';

import express from 'express';

const app = express();

// Route handler for root path
app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

app.listen(8080, () => {
  console.log('Express server listening at localhost:8080');
});