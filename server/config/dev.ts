import { GamesFactory, UsersFactory } from '../factories';
import { Game, GameFacade } from '../factories/games.factory';
import { UserFacade } from '../factories/users.factory';

declare let global: any;

export const devGameFacadeImpl: GameFacade = {
  addGame: (game: Game) => global.Games[game.id] = game,
  getGames: () => global.Games,
  removeAllGames: () => {
    global.Games = {};
    return true;
  },
  removeGame: (uuid: string) => {
    const {[uuid]: value, ...restOfGames} = global.Games;
    global.Games = restOfGames;
    return true;
  },
  isGameExist: (gameId: string) => !!global.Games[gameId]

};

export const devUserFacadeImpl: UserFacade = {
  removeUser: uuid => {
    const {[uuid]: value, ...restOfUsers} = global.Users;
    global.Users = restOfUsers;
    return true;
  },
  addUser: user => global.Users[user.id] = user,
  removeAllUsers: () => {
    global.Users = {};
    return true;
  },
  isUserExist: userId => !!global.Users[userId],
  getUsers:() => global.Users
};

export const games = new GamesFactory(devGameFacadeImpl);
export const users = new UsersFactory(devUserFacadeImpl);


