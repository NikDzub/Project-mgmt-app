import express from 'express';
import dotenv from 'dotenv/config';
import { connectDB } from './config/db.js';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema.js';
import cors from 'cors';

const port = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
