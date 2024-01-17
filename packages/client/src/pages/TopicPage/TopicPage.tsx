import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Box } from '@mui/material';
import { Forum } from '../../api';
import { addComment, deleteComment, getTopicById, updateComment } from '../../services';
import { Button, Confirm, Input, Layout, TopicMessagesList } from '../../components';
import { ITEMS_PER_PAGE_DEFAULT } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../hooks';

import './topicPageStyles.scss';

/**
 * Страница топика
 */
export const TopicPage: FC = () => {
  const { topic, topicMessagesCount, comments } = useAppSelector((state) => state.topics);
  const dispatch = useAppDispatch();
  const params = useParams();
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessageId, setSelectedMessageId] = useState<number>();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  /**
   * Эффект, отвечающий за
   * получение топика
   */
  useEffect(() => {
    if (params?.topicId) {
      dispatch(getTopicById(parseInt(params?.topicId, 10)));
    }
  }, [params?.topicId]);

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
  const openDeleteMessageConfirmHandler = (id: number) => {
    setSelectedMessageId(id);
    setConfirmDeleteOpen(true);
  };

  /**
   * Обработчик удаления
   */
  const confirmDeleteMessageHandler = () => {
    if (selectedMessageId && topic?.id) {
      dispatch(deleteComment({ id: selectedMessageId, topicId: parseInt(topic.id, 10) }));
    }
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
  const editMessageHandler = (id: number) => {
    const message = comments?.find((m) => m.id === id);
    setSelectedMessageId(id);
    setCurrentMessage(message?.text ?? '');
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
  const sendMessageHandler = async () => {
    if (selectedMessageId && topic?.id) {
      dispatch(
        updateComment({
          id: selectedMessageId,
          text: currentMessage,
          topicId: parseInt(topic.id, 10),
        })
      );
      setSelectedMessageId(undefined);
    } else if (topic?.id) {
      dispatch(addComment({ text: currentMessage, topicId: parseInt(topic.id, 10) }));
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
          messages={comments ?? []}
          className='topic-page-content__list'
          messagesCount={topicMessagesCount ?? 0}
          messagesPerPage={ITEMS_PER_PAGE_DEFAULT}
          onPageChange={changePageHandler}
          theme={topic?.title ?? ''}
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
