import express from 'express';
import cors from 'cors';
import routes from '../routes';
import { connectToDb } from '../database';

const app = express();

if (process.env.NODE_ENV !== 'TEST') {
  connectToDb();
}

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(routes);

export default app;
