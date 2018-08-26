import { Router } from 'express';
import { App } from '../app';

export const getUserRoutes = (app: App) => {
  const router = Router();
  router.post('/create', async (_req, res) => {
    const {id, name} = await app.users.createUser();
    res.send({id, name});
  });

  router.delete('/delete/:userId', async (req, res) => {
    const userId = req.params.userId;
    const removed = await app.users.removeUser(userId);
    res.send(removed);
  });
  return router;
};
