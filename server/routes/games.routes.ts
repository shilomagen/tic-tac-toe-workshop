import { Router } from 'express';
import { App } from '../app';

export const getGameRoutes = (app: App) => {
  const router = Router();
  router.post('/create', async (_req, res) => {
    const gameId = await app.games.createGame();
    res.send({ gameId });
  });

  router.delete('/delete/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    const removed = await app.games.removeGame(gameId);
    res.send(removed);
  });
  return router;
};
