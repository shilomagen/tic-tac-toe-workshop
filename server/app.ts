import { GamesFactory, UsersFactory } from './factories';

export class App {
  public games: GamesFactory;
  public users: UsersFactory;
  constructor({games, users}: {games: GamesFactory; users: UsersFactory}) {
    this.games = games;
    this.users = users;
  }

}
