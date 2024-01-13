import type { Request } from 'express';
import type { CurrentUser } from '../bll';

/**
 * Расширенный интерфейс запроса
 */
export interface RequestWithUser extends Request {
  currentUser: CurrentUser;
}
