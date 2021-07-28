export const ROUTES = {
  USER: {
    MAIN: '/user',
    GET_USER: '/get/:id',
    GET_ALL_USERS: '/all',
    UPDATE: '/update/:id',
    DELETE: '/delete/:id',
  },
  MESSAGE: {
    MAIN: '/message',
    GET_MESSAGE: '/get/:id',
    GET_MESSAGES_OF_TWO_USERS: '/user',
    UPDATE: 'update/:id',
    DELETE: 'delete/:id',
    GET_MESSAGE_HISTORY: '/history/:id',
  },
  AUTH: {
    MAIN: '/auth',
    LOGIN: '/sign_in',
  },
  MAIN: 'api',
};
