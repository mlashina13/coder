import { Topic } from '../../types/common';

/**
 * Моковые данные для форума (в будущем будут удалены)
 */
export const FORUM_MOKE_DATA: Array<Topic> = [
  {
    id: '1',
    creationDate: '2023-02-18T19:30:16.825Z',
    creator: 'Иванов Иван',
    messagesCount: 20,
    theme: 'Итоги турнира',
    viewsCount: 63,
  },
  {
    id: '2',
    creationDate: '2023-04-22T19:30:16.825Z',
    creator: 'Ольга Смирнова',
    messagesCount: 0,
    theme: 'Вопрос: не работает горизонтальный скролинг в прототипе',
    viewsCount: 2,
  },
  {
    id: '3',
    creationDate: '2023-05-16T19:30:16.825Z',
    creator: 'Сергей Ахтырский',
    messagesCount: 5,
    theme: 'Не пойму правила игры',
    viewsCount: 9,
  },
  {
    id: '4',
    creationDate: '2023-07-29T19:30:16.825Z',
    creator: 'Семен Нагой',
    messagesCount: 1,
    theme: 'Как обмануть игру',
    viewsCount: 1,
  },
  {
    id: '5',
    creationDate: '2023-10-10T19:30:16.825Z',
    creator: 'Анна Каренина',
    messagesCount: 2,
    theme: 'Жаль, что игра не про поезд',
    viewsCount: 23,
  },
];
