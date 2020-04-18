import express from 'express';
import routes from '../routes';
import { connectToDb } from '../database';

const app = express();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'TEST') {
  connectToDb();
}

app.use(express.json());
app.use(routes);

export default app;
