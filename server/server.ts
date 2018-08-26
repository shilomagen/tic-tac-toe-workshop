import express from 'express';
import { getAppInstance } from './config';
import { getGameRoutes } from './routes/games.routes';
import { getUserRoutes } from './routes/users.routes';

export const server = express();
export const app = getAppInstance();

server.use('/game', getGameRoutes(app));
server.use('/user', getUserRoutes(app));






