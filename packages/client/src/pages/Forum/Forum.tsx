import { FC, useEffect, useState } from 'react';
import { Button, Dialog, Input, Layout, TopicsList } from '../../components';
import { Topic } from '../../types/common';
import { ITEMS_PER_PAGE_DEFAULT } from '../../constants/common';

const topicsMoke: Array<Topic> = [
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

export const Forum: FC = () => {
  const [topics, setTopics] = useState<Array<Topic>>([]);
  const [topicsTotalCount, setTopicsTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  const [topicDialogMode, setTopicDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedTopicTheme, setSelectedTopicTheme] = useState<string>();

  /**
   * Эффект, отвечающий за
   * получение топиков
   */
  useEffect(() => {
    // TODO: в будущем сделать запрос к API
    setTopics(topicsMoke);
    setTopicsTotalCount(topicsMoke.length);

    return () => {
      // TODO: в будущем предусмотреть прерывание запроса
    };
  }, [currentPage]);

  /**
   * Обработчик смены страницы
   */
  const changePageHandler = (newPage: number) => {
    setCurrentPage(newPage);
  };

  /**
   * Обработчик клика по топику
   */
  const clickTopicHandler = (id: string) => {
    console.log('click topic', id);
  };

  const createTopicHandler = () => {
    setTopicDialogOpen(true);
    setTopicDialogMode('create');
  };

  const deleteTopicHandler = (id: string) => {
    console.log('delete topic', id);
  };

  const editTopicHandler = (id: string) => {
    setTopicDialogOpen(true);
    setTopicDialogMode('edit');
  };

  const closeTopicDialogHandler = () => {
    setTopicDialogOpen(false);
    setTopicDialogMode('create');
  };

  const topicDialogActions = (
    <>
      <Button label='Сохранить' />
      <Button label='Отмена' variant='outlined' />
    </>
  );

  return (
    <Layout>
      <Dialog
        open={topicDialogOpen}
        title={topicDialogMode === 'edit' ? 'Изменить тему' : 'Создать тему'}
        onClose={closeTopicDialogHandler}
        actions={topicDialogActions}
      >
        <Input label='Название' value={selectedTopicTheme} />
      </Dialog>
      <TopicsList
        topics={topics}
        onClickTopic={clickTopicHandler}
        onCreateTopic={createTopicHandler}
        onDeleteTopic={deleteTopicHandler}
        onEditTopic={editTopicHandler}
        onPageChange={changePageHandler}
        topicsCount={topicsTotalCount}
        topicsPerPage={ITEMS_PER_PAGE_DEFAULT}
      />
    </Layout>
  );
};
