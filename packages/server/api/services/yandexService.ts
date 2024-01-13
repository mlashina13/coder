import axios from 'axios'
import type { CurrentUser } from '../../bll';

const API_ROOT = 'https://ya-praktikum.tech/api/v2/'

export class YandexService {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrentUser(): Promise<CurrentUser | undefined> {
    let user: CurrentUser | undefined;
    try {
      const { data } = await axios.get(`${API_ROOT}/auth/user`, {
        headers: {
          cookie: this._cookieHeader,
        },
      });
      user = data;
    } catch {
      user = undefined;
    }
    return user;
  }
}
