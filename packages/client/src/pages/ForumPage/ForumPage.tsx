import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Confirm, Dialog, Layout, TopicForm, TopicsList } from '../../components';
import { Topic } from '../../types/common';
import { ITEMS_PER_PAGE_DEFAULT } from '../../constants/common';
import { FORUM_MOKE_DATA } from './forumMokeData';
import { ROUTER_URLS } from '../../constants';

/**
 * Режим работы окна редактирования топика
 */
type TopicDialogMode = 'create' | 'edit';

/**
 * Страница форума
 */
export const ForumPage: FC = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Array<Topic>>([]);
  const [topicsTotalCount, setTopicsTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  const [topicDialogMode, setTopicDialogMode] = useState<TopicDialogMode>('create');
  const [deleteTopicDialogOpen, setDeleteTopicDialogOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string>();

  /**
   * Эффект, отвечающий за
   * получение топиков
   */
  useEffect(() => {
    // TODO: в будущем сделать запрос к API
    setTopics(FORUM_MOKE_DATA);
    setTopicsTotalCount(FORUM_MOKE_DATA.length);

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
  const clickTopicHandler = (id: string) =>
    navigate(ROUTER_URLS.ForumTopic.replace(':topicId', id));

  /**
   * Обработчик открытия окна редактирования топика
   */
  const openTopicDialogHandler = (mode: TopicDialogMode, id?: string) => {
    setTopicDialogOpen(true);
    setTopicDialogMode(mode);
    if (mode === 'edit') {
      setSelectedTopicId(id);
    } else {
      setSelectedTopicId(undefined);
    }
  };

  /**
   * Обработчик события сохранения топика
   */
  const saveTopicHandler = (newTheme: string) => {
    console.log(newTheme);
    if (topicDialogMode === 'edit' && selectedTopicId) {
      // TODO: здесь будет запрос на обновление
    } else if (topicDialogMode === 'create') {
      // TODO: здесь будет запрос на создание
    }
    setTopicDialogOpen(false);
  };

  /**
   * Обработчик закрытия окна редактирования топика
   */
  const closeTopicDialogHandler = () => {
    setTopicDialogOpen(false);
    setSelectedTopicId(undefined);
  };

  /**
   * Обработчик открытия окна подтверждения удаления топика
   */
  const openDeleteTopicConfirmHandler = (id: string) => {
    setDeleteTopicDialogOpen(true);
    setSelectedTopicId(id);
  };

  /**
   * Обработчик подтверждения удаления топика
   */
  const confirmDeleteTopicHandler = () => {
    setDeleteTopicDialogOpen(false);
    // TODO: здесь будет запрос на удаление топика
  };

  /**
   * Обработчик отмены удаления топика
   */
  const cancelDeleteTopicHandler = () => {
    setDeleteTopicDialogOpen(false);
    setSelectedTopicId(undefined);
  };

  /**
   * Получить тему выбранного топика
   */
  const getSelectedTopicTheme = () => topics.find((t) => t.id === selectedTopicId)?.theme ?? '';

  return (
    <Layout>
      <Dialog
        open={topicDialogOpen}
        title={topicDialogMode === 'edit' ? 'Изменить тему' : 'Создать тему'}
        onClose={closeTopicDialogHandler}
      >
        <TopicForm
          onFormSubmit={saveTopicHandler}
          onCancel={closeTopicDialogHandler}
          theme={getSelectedTopicTheme()}
        />
      </Dialog>
      <Confirm
        title='Удалить тему'
        message={`Вы действаительно хотите удалить тему "${getSelectedTopicTheme()}"?`}
        onConfirm={confirmDeleteTopicHandler}
        open={deleteTopicDialogOpen}
        onCancel={cancelDeleteTopicHandler}
      />
      <TopicsList
        topics={topics}
        onClickTopic={clickTopicHandler}
        onCreateTopic={() => openTopicDialogHandler('create')}
        onDeleteTopic={openDeleteTopicConfirmHandler}
        onEditTopic={(id) => openTopicDialogHandler('edit', id)}
        onPageChange={changePageHandler}
        topicsCount={topicsTotalCount}
        topicsPerPage={ITEMS_PER_PAGE_DEFAULT}
      />
    </Layout>
  );
};
