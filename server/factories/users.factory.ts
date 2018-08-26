import generateUUID from 'uuid/v4';
import titleCase from 'title-case';
import uniqueNameGenerator from 'unique-names-generator';

export type User = {
  id: string;
  name: string;
};

export type Users = { [key: string]: User }

export interface UserFacade {
  addUser: (user: User) => User;
  removeUser: (uuid: string) => boolean;
  getUsers: () => Users;
  removeAllUsers: () => boolean;
  isUserExist: (userId: string) => boolean;
}

export class UsersFactory {
  constructor(private userFacade: UserFacade) {
  }

  async createUser() {
    const user: User = { id: generateUUID(), name: titleCase(uniqueNameGenerator.generate()) };
    await this.userFacade.addUser(user);
    return user;
  }

  getUsers(): Users {
    return this.userFacade.getUsers();
  }

  async removeUser(userId: string) {
    if (this.userFacade.isUserExist(userId)) {
      return this.userFacade.removeUser(userId);
    }
    throw new Error(`There is no user with ID: ${userId}`);
  }

}
