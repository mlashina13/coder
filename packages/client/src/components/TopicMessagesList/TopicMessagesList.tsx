import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Box, Divider, List, ListSubheader, Pagination, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import { TopicMessagesListProps } from './TopicMessagesListProps';
import { TopicMessagesListItem } from './TopicMessagesListItem/TopicMessagesListItem';
import { EyeIcon } from '../../assets';
import './topicMessagesListStyles.scss';

/**
 * Компонент списка сообщений топика
 */
export const TopicMessagesList: FC<TopicMessagesListProps> = (props) => {
  const {
    messages,
    messagesCount,
    messagesPerPage,
    onPageChange,
    theme,
    className,
    onDeleteMessage,
    onEditMessage,
    themeViewsCount = 0,
  } = props;

  const [pagesCount, setPagesCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  /**
   * Эффект, устанавливающий кол-во страниц
   */
  useEffect(() => {
    setPagesCount(Math.ceil(messagesCount / messagesPerPage));
  }, [messagesCount, messagesPerPage]);

  /**
   * Обработчик смены страницы
   */
  const onPageChangedHandler = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  /**
   * Обработчик события удаления сообщения
   */
  const onDeleteMessageHandler = useCallback(
    (id: string) => {
      onDeleteMessage?.(id);
    },
    [onDeleteMessage]
  );

  /**
   * Обработчик события изменения сообщения
   */
  const onEditMessageHandler = useCallback(
    (id: string) => {
      onEditMessage?.(id);
    },
    [onEditMessage]
  );

  return (
    <Box className={clsx('topic-msgs-list', className)}>
      <List>
        <ListSubheader className='topic-msgs-list__list-header'>
          <Typography variant='h6' className='topic-msgs-list__list-title'>
            {theme}
          </Typography>
          <Tooltip title='Количество просмотров'>
            <Box className='topic-msgs-list__views-counter'>
              <EyeIcon width={16} height={16} />
              <span>{themeViewsCount}</span>
            </Box>
          </Tooltip>
        </ListSubheader>
        <Divider />
        {messages.map((m) => (
          <TopicMessagesListItem
            {...m}
            key={m.id}
            onDelete={onDeleteMessageHandler}
            onEdit={onEditMessageHandler}
          />
        ))}
      </List>
      <Pagination
        size='small'
        className='topic-msgs-list__pagination'
        count={pagesCount}
        page={currentPage}
        onChange={onPageChangedHandler}
      />
    </Box>
  );
};
