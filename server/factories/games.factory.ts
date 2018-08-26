import generateUUID from 'uuid/v4';

export type Game = {
  id: string;
};

export type Games = { [key: string]: Game }

export interface GameFacade {
  addGame: (game: Game) => Game;
  removeGame: (uuid: string) => boolean;
  getGames: () => GamesFactory;
  removeAllGames: () => boolean;
  isGameExist: (gameId: string) => boolean;
}

export class GamesFactory {
  constructor(private gameFacade: GameFacade) {
  }

  async createGame() {
    const game: Game = { id: generateUUID() };
    await this.gameFacade.addGame(game);
    return game.id;
  }

  getGames(): GamesFactory {
    return this.gameFacade.getGames();
  }

  async removeGame(gameId: string) {
    if (this.gameFacade.isGameExist(gameId)) {
      return this.gameFacade.removeGame(gameId);
    }
    throw new Error(`There is no game with ID: ${gameId}`)
  }

}
