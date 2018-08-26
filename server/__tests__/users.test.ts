import { UsersFactory } from '../factories';
import { devUserFacadeImpl } from '../config/dev';
jest.mock('unique-names-generator');

declare let global: any;
let users: UsersFactory;

describe('User tests', () => {
  beforeEach(() => {
    global.Users = {};
    users = new UsersFactory(devUserFacadeImpl);
  });
  afterEach(() => {
    users = null;
  });

  test('should create new user', async () => {
    const {id} = await users.createUser();
    expect(users.getUsers()[id].name).toEqual('Big Yemen Boy');
  });

  test('should remove user if exist', async () => {
    const {id} = await users.createUser();
    const removed = await users.removeUser(id);
    expect(removed).toBeTruthy();
    expect(Object.keys(users.getUsers())).toHaveLength(0);
  });

  it('should not remove game if not exist', async () => {
    expect(Object.keys(users.getUsers())).toHaveLength(0);
    try {
      await users.removeUser('123')
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.message).toEqual('There is no user with ID: 123')
    }
  });

});
