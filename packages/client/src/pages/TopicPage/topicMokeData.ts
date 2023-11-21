import { Topic } from '../../types/common';

/**
 * Моковые данные для топика (в будущем будут удалены)
 */
export const TOPIC_MOKE_DATA: Topic = {
  id: '1',
  creationDate: '2023-02-18T19:30:16.825Z',
  creator: 'Сергей Ахтырский',
  messagesCount: 5,
  theme: 'Не пойму правила игры',
  viewsCount: 63,
  messages: [
    {
      creationDate: '2023-02-18T19:30:16.825Z',
      creator: 'Иванов Иван',
      id: '1',
      message: 'Почитай правила в разделе "Игра"',
    },
    {
      creationDate: '2023-02-18T19:30:16.825Z',
      creator: 'Семен Смелый',
      id: '2',
      message: 'Да, перейди в тот раздел. Вот же люди пошли, совсем не умеют информацию искать',
    },
    {
      creationDate: '2023-02-18T19:30:16.825Z',
      creator: 'Ольга Петрова',
      id: '3',
      message: 'Давайте не флудить!',
    },
    {
      creationDate: '2023-02-18T19:30:16.825Z',
      creator: 'Семен Смелый',
      id: '4',
      message: 'Ща флудану!',
    },
    {
      creationDate: '2023-02-18T19:30:16.825Z',
      creator: 'Семен Смелый',
      id: '5',
      message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. In delectus exercitationem ratione 
    ipsum enim sed vitae aspernatur voluptate! Non, molestiae accusantium labore similique repudiandae in 
    corporis aperiam fugit laudantium ut. Lorem ipsum dolor sit amet, consectetur adipisicing elit. In delectus 
    exercitationem ratione ipsum enim sed vitae aspernatur voluptate! Non, molestiae accusantium labore similique 
    repudiandae in corporis aperiam fugit laudantium ut. Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
    In delectus exercitationem ratione ipsum enim sed vitae aspernatur voluptate! Non, molestiae accusantium labore 
    similique repudiandae in corporis aperiam fugit laudantium ut. Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
    In delectus exercitationem ratione ipsum enim sed vitae aspernatur voluptate! Non, molestiae accusantium labore similique 
    repudiandae in corporis aperiam fugit laudantium ut.`,
    },
  ],
};
