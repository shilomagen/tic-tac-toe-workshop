import { games, users } from './dev';
import { App } from '../app';

export const getAppInstance = () => new App(process.env.NODE_ENV === 'prod' ? {games: null, users: null} : {games, users})

