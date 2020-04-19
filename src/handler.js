/* eslint-disable no-param-reassign */
import { createServer, proxy } from 'aws-serverless-express';
import app from './config';

const server = createServer(app);
exports.handler = (event, context) => {
  const ctx = context;
  ctx.callbackWaitsForEmptyEventLoop = false;

  return proxy(server, event, ctx);
};
