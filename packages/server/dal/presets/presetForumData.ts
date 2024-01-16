import { CommentModel, TopicModel, EmojiModel, ThemeModel } from '../models';
import { emoji } from './emojiList';

/**
 * Предзаполнение данных форума
 */
export const presetForumData = async () => {
  try {
    const topicsCount = await TopicModel.count();
    if (topicsCount === 0) {
      const topic = await TopicModel.create({
        authorId: 1349879,
        title: 'Тестовый топик для проверки функционала форума',
        viewsCount: 10,
      });
      const comments = await CommentModel.bulkCreate([
        {
          authorId: 1349879,
          text: 'Первый комментарий, оставленный для тестирования функционала',
          topicId: topic.id,
        },
        {
          authorId: 1349879,
          text: 'Второй комментарий, так же оставленный для тестирования функционала',
          topicId: topic.id,
        },
      ]);
      await CommentModel.bulkCreate(
        comments.map((c) => ({
          authorId: 1349829,
          parentId: c.id,
          topicId: topic.id,
          text: `Ответ на комментарий #${c.id}!`,
        }))
      );
      console.log('Forum data successfull preseted');
    } else {
      console.log('Forum data does not require presetting');
    }
  } catch (error) {
    console.error('Unable to preset forum data: ', error);
  }
};

/**
 * Предзаполнение списка эмодзи
 */
export const presetEmoji = async () => {
  try {
    const emojiCount = await EmojiModel.count();
    if (emojiCount === 0) {
      const allEmoji = await EmojiModel.bulkCreate(emoji);
      console.log('Emoji successfull preseted');
    } else {
      console.log('Emoji does not require presetting');
    }
  } catch (error) {
    console.error('Unable to preset emoji: ', error);
  }
};

/**
 * Предзаполнение темы
 */
export const presetTheme = async () => {
  try {
    const themeCount = await ThemeModel.count();
    if (themeCount === 0) {
      const theme = await ThemeModel.create({
        userId: 1349879,
        theme: 'light',
      });
    } else {
      console.log('Theme does not require presetting');
    }
  } catch (error) {
    console.error('Unable to preset theme: ', error);
  }
};
