import axios from 'axios';
import * as http from 'http';
import { server as expressServer } from '../server';
import { App } from '../app';
import { getUrl, PORT } from '../environment';
import { getAppInstance } from '../config';

declare let global: any;

let server: http.Server;
let app: App;
describe('Routes test', () => {
  beforeEach(() => {
    global.Games = {};
    global.Users = {};
    app = getAppInstance();
    return server = expressServer.listen(PORT);
  });
  afterEach(() => server.close());

  describe('Game routes', () => {
    test('should create new game', async () => {
      const { data } = await axios.post(getUrl('/game/create'));
      expect(app.games.getGames()).toHaveProperty(data.gameId);
    });
    test('should remove games', async () => {
      expect(app.games.getGames()).toEqual({});
      const { data } = await axios.post(getUrl('/game/create'));
      await axios.delete(getUrl(`/game/delete/${data.gameId}`));
      expect(await app.games.getGames()).toEqual({});
    });
  });

  describe('User routes', () => {
    test('should create new user', async () => {
      const {data} = await axios.post(getUrl('/user/create'));
      expect(app.users.getUsers()).toHaveProperty(data.id);
    });
  });
});
