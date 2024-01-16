import type { Request, Response } from 'express';
import { ThemeService } from '../services';
import type { RequestWithUser } from '../../types';

/**
 * API контроллер темы
 */
export class ThemeController {
  static async getTheme(request: Request, response: Response) {
    try {
      const { currentUser } = request as RequestWithUser;
      const service = new ThemeService();
      const theme = await service.getTheme(currentUser.id);
      response.status(200).send({
        data: theme,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  }

  static async saveTheme(request: Request, response: Response) {
    try {
      const { currentUser } = request as RequestWithUser;
      const { body } = request;
      const service = new ThemeService();
      let userId;

      if (currentUser && currentUser.id) {
        userId = currentUser.id;
      } else {
        const user = await service.getTheme(currentUser.id);

        userId = user?.get('userId');
      }

      const theme = await service.saveTheme({
        theme: body.theme,
        userId: userId || body.userId,
      });

      response.status(200).send({
        data: theme,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  }
}
