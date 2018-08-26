import { devGameFacadeImpl } from '../config/dev';
import { GamesFactory } from '../factories';

let games: GamesFactory;
declare let global: any;

describe('Game tests', () => {
  beforeEach(() => {
    global.Games = {};
    games = new GamesFactory(devGameFacadeImpl);
  });
  afterEach(() => {
    games = null;
  });

  test('should add game', async () => {
    const gameId = await games.createGame();
    expect(games.getGames()).toHaveProperty(gameId);
  });

  it('should remove game if there is a game', async () => {
    expect(Object.keys(games.getGames())).toHaveLength(0);
    const gameId = await games.createGame();
    const removed = await games.removeGame(gameId);
    expect(removed).toBeTruthy();
    expect(games.getGames()).toEqual({});
  });

  it('should not remove game if not exist', async () => {
    expect(Object.keys(games.getGames())).toHaveLength(0);
    try {
      await games.removeGame('123')
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.message).toEqual('There is no game with ID: 123')
    }
  });

});
