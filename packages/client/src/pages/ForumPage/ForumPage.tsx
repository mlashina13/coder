import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createTopic, deleteTopic, getAllTopics, updateTopic } from '../../services';
import { Confirm, Dialog, Layout, TopicForm, TopicsList } from '../../components';
import { ITEMS_PER_PAGE_DEFAULT } from '../../constants/common';
import { ROUTER_URLS } from '../../constants';

/**
 * Режим работы окна редактирования топика
 */
type TopicDialogMode = 'create' | 'edit';

/**
 * Страница форума
 */
export const ForumPage: FC = () => {
  const { topics } = useAppSelector((state) => state.topics);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
    dispatch(getAllTopics());
  }, []);

  useEffect(() => {
    if (Array.isArray(topics) && topics.length) {
      setTopicsTotalCount(topics.length);
    }
  }, [topics]);

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
    if (topicDialogMode === 'edit' && selectedTopicId) {
      dispatch(updateTopic({ id: parseInt(selectedTopicId, 10), title: newTheme }));
    } else if (topicDialogMode === 'create') {
      dispatch(createTopic({ title: newTheme }));
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
    if (selectedTopicId) {
      dispatch(deleteTopic(parseInt(selectedTopicId, 10)));
      setSelectedTopicId(undefined);
    }
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
  const getSelectedTopicTheme = () => topics?.find((t) => t.id === selectedTopicId)?.title ?? '';

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
