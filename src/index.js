'use strict';

import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
import ExpressPlayground from 'graphql-playground-middleware-express';

import { Course } from './models/Course';

const APP_MONGO_URI = process.env.APP_MONGO_URI;
if (!APP_MONGO_URI) {
  throw 'Variable APP_MONGO_URI is not defined';
}

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});
server.applyMiddleware({ app });

// Route handler for root path
app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

app.get('/playground', ExpressPlayground({ endpoint: '/graphql' }));

mongoose.connect(APP_MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log('Connected to MongoDB');
  app.listen(8080, () => {
    console.log('Express server listening at localhost:8080');
  });
});