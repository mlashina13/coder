import { ThemeModel } from '../../dal';
import type { ThemeDto } from '../../dto';
/**
 * Сервис для работы с темой
 */
export class ThemeService {
  /**
   * Получить темы пользователя
   */
  public getTheme = (currentUser: number) =>
    ThemeModel.findOne({
      where: { userId: currentUser },
    });

  /**
   * Сохранение темы пользователя
   */
  public saveTheme = (saveThemeDto: any) => ThemeModel.upsert(saveThemeDto);
}
