import axios from 'axios';
import { Config } from '../constants/config';

axios.defaults.withCredentials = true;

interface RegistrationData {
  login: string;
  password: string;
  email: string;
  phone: string;
  second_name: string;
  first_name: string;
}

/** класс для работы с авторизацией */
class Auth {
  authServiceName: string;

  constructor() {
    this.authServiceName = 'auth';
  }

  /** авторизация */
  signIn(data: Pick<RegistrationData, 'login' | 'password'>) {
    return axios
      .post(Config.getPath('/signin', this.authServiceName), data)
      .then((resp) => resp.data);
  }

  /** получение данных по текущему пользователю */
  getAuthUser() {
    return axios.get(Config.getPath('/user', this.authServiceName)).then((resp) => resp.data);
  }

  registration(data: RegistrationData) {
    return axios
      .post(Config.getPath('/signup', this.authServiceName), data)
      .then((resp) => resp.data);
  }
}

const instance = new Auth();
export { instance as Auth };
