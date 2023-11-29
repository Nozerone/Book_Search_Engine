const { ApolloServer } = require('@apollo/server');
const express = require('express');
const { expressMiddleware } = require('@apollo/server/express4');


const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');

// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import cors from 'cors';

// import express from 'express';
// import  { resolvers, types } from "schema";

//Delete next line?
// const path = require('path');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});



app.use('/graphql', cors(), express.json(), expressMiddleware(server));


const PORT = process.env.PORT || 3001;
const app = express();

// app.use(express.urlencoded({ extended: true }));
const startApolloServer = async () => {
  await server.start();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server));

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
   
})

})
};