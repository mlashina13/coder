import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Button, Confirm, Input, Layout, TopicMessagesList } from '../../components';
import { Topic } from '../../types/common';
import { ITEMS_PER_PAGE_DEFAULT } from '../../constants/common';
import './topicPageStyles.scss';
import { TOPIC_MOKE_DATA } from './topicMokeData';

/**
 * Страница топика
 */
export const TopicPage: FC = () => {
  const [topic, setTopic] = useState<Topic>();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messagesTotalCount, setMessagesTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessageId, setSelectedMessageId] = useState<string>();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  /**
   * Эффект, отвечающий за
   * получение топика
   */
  useEffect(() => {
    // TODO: в будущем сделать запрос к API
    setTopic(TOPIC_MOKE_DATA);
    setMessagesTotalCount(TOPIC_MOKE_DATA.messages?.length ?? 0);

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
   * Обработчик изменения сообщения
   */
  const changeMessageTextHandler = (value: string) => {
    setCurrentMessage(value);
  };

  /**
   * Обработчик открытия окна подтверждения удаления
   */
  const openDeleteMessageConfirmHandler = (id: string) => {
    setSelectedMessageId(id);
    setConfirmDeleteOpen(true);
  };

  /**
   * Обработчик удаления
   */
  const confirmDeleteMessageHandler = () => {
    // TODO: Здесь будет запрос на удаление
    setSelectedMessageId(undefined);
    setConfirmDeleteOpen(false);
  };

  /**
   * Обработчик отмены удаления
   */
  const cancelDeleteMessageHandler = () => {
    setSelectedMessageId(undefined);
    setConfirmDeleteOpen(false);
  };

  /**
   * Обработчик изменения сообщения
   */
  const editMessageHandler = (id: string) => {
    const message = topic?.messages?.find((m) => m.id === id);
    setSelectedMessageId(id);
    setCurrentMessage(message?.message ?? '');
  };

  /**
   * Обработчик отмены редактирования
   */
  const cancelEditHandler = () => {
    setSelectedMessageId(undefined);
    setCurrentMessage('');
  };

  /**
   * Обработчик отправки сообщения
   */
  const sendMessageHandler = () => {
    if (selectedMessageId) {
      // TODO:  Здесь будет запрос на изменение
      setSelectedMessageId(undefined);
    } else {
      // TODO: Здесь будет запрос на отправку
    }
    setCurrentMessage('');
  };

  return (
    <Layout>
      <Confirm
        title='Удалить сообщение'
        message='Вы действаительно хотите удалить данное сообщение?'
        onConfirm={confirmDeleteMessageHandler}
        open={confirmDeleteOpen}
        onCancel={cancelDeleteMessageHandler}
      />
      <Box className='topic-page-content'>
        <TopicMessagesList
          messages={topic?.messages ?? []}
          className='topic-page-content__list'
          messagesCount={messagesTotalCount}
          messagesPerPage={ITEMS_PER_PAGE_DEFAULT}
          onPageChange={changePageHandler}
          theme={topic?.theme ?? ''}
          themeViewsCount={topic?.viewsCount}
          onDeleteMessage={openDeleteMessageConfirmHandler}
          onEditMessage={editMessageHandler}
        />
        <Input
          multiline
          placeholder='Введите Ваше сообщение...'
          rows={5}
          value={currentMessage}
          onChange={(e) => changeMessageTextHandler(e.target.value)}
        />
        <Box className='topic-page-content__actions'>
          <Button
            label='Отправить сообщение'
            disabled={!currentMessage}
            onClick={sendMessageHandler}
          />
          {!!selectedMessageId && (
            <Button
              label='Отменить редактирование'
              variant='outlined'
              onClick={cancelEditHandler}
            />
          )}
        </Box>
      </Box>
    </Layout>
  );
};
