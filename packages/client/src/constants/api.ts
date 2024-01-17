const YANDEX_API_VERSION = 'v2';
const EXPRESS_API_VERSION = 'v1';
const AUTH_SERVICE_NAME = `${YANDEX_API_VERSION}/auth`;
const USER_SERVICE_NAME = `${YANDEX_API_VERSION}/user`;
const LEADERBOARD_SERVICE_NAME = `${YANDEX_API_VERSION}/leaderboard`;
const YANDEX_OAUTH = `${YANDEX_API_VERSION}/oauth/yandex`;
const USER_THEME_SERVICE_NAME = `${EXPRESS_API_VERSION}/theme`;
const FORUM = `${EXPRESS_API_VERSION}/forum`;

const byId = (uri: string) => (id?: string | number | null) => `${uri}/${id}`;

/** auth api */
export const SIGN_IN_API = `/${AUTH_SERVICE_NAME}/signin`;

export const GET_AUTH_USER_API = `/${AUTH_SERVICE_NAME}/user`;

export const REGISTRATION = `/${AUTH_SERVICE_NAME}/signup`;

export const LOG_OUT_API = `/${AUTH_SERVICE_NAME}/logout`;

/** user api */
export const UPDATE_AVATAR_API = `/${USER_SERVICE_NAME}/profile/avatar`;

export const UDPATE_USER_DATA_API = `/${USER_SERVICE_NAME}/profile`;

export const UPDATE_PASSWORD_API = `/${USER_SERVICE_NAME}/password`;

/** leaderboard */
export const LEADERBOARD_API = `/${LEADERBOARD_SERVICE_NAME}`;

export const GET_LEADERBOARD_API = `/${LEADERBOARD_SERVICE_NAME}/all`;

/** yandex auth  api */
export const GET_SERVICE_ID = `/${YANDEX_OAUTH}/service-id`;

export const YANDEX_SIGNIN = `/${YANDEX_OAUTH}`;

/** user theme api */
export const GET_USER_THEME = byId(`/${USER_THEME_SERVICE_NAME}`);

export const UPDATE_USER_THEME = `/${USER_THEME_SERVICE_NAME}/save`;

/** forum api */
export const TOPICS = `/${FORUM}/topics/`;

export const COMMENT = `/${FORUM}/comment/`;

export const TOPIC = `${FORUM}/topic/`;

export const MESSAGES_COUNT = `${FORUM}/getTopicMessagesCount/`;

export const COMMENTS = `${FORUM}/comments/`;
