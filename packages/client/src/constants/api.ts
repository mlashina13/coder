const AUTH_SERVICE_NAME = 'auth';
const USER_SERVICE_NAME = 'user';

/** auth api */
export const SIGN_IN_API = `/${AUTH_SERVICE_NAME}/signin`;

export const GET_AUTH_USER_API = `/${AUTH_SERVICE_NAME}/user`;

export const REGISTRATION = `/${AUTH_SERVICE_NAME}/signup`;

export const LOG_OUT_API = `/${AUTH_SERVICE_NAME}/logout`;

/** user api */
export const UPDATE_AVATAR_API = `/${USER_SERVICE_NAME}/profile/avatar`;

export const UDPATE_USER_DATA_API = `/${USER_SERVICE_NAME}/profile`;

export const UPDATE_PASSWORD_API = `/${USER_SERVICE_NAME}/password`;
