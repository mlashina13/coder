import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListSubheader,
  Pagination,
  Tooltip,
  Typography,
} from '@mui/material';
import { AddConversationIcon } from '../../assets';
import { TopicListItem } from './TopicListItem';
import { TopicsListProps } from './TopicsListProps';
import './topicsListStyles.scss';

/**
 * Компонент списка топиков
 */
export const TopicsList: FC<TopicsListProps> = (props) => {
  const {
    onPageChange,
    topicsCount,
    topicsPerPage,
    topics,
    onClickTopic,
    onCreateTopic,
    onDeleteTopic,
    onEditTopic,
  } = props;

  const [pagesCount, setPagesCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  /**
   * Эффект, устанавливающий кол-во страниц
   */
  useEffect(() => {
    setPagesCount(Math.ceil(topicsCount / topicsPerPage));
  }, [topicsCount, topicsPerPage]);

  /**
   * Обработчик события создания топика
   */
  const onCreateTopicHandler = () => {
    onCreateTopic && onCreateTopic();
  };

  /**
   * Обработчик события удаления топика
   */
  const onDeleteTopicHandler = useCallback((id: string) => {
    onDeleteTopic?.(id);
  }, []);

  /**
   * Обработчик события изменения топика
   */
  const onEditTopicHandler = useCallback((id: string) => {
    onEditTopic?.(id);
  }, []);

  /**
   * Обработчик события клика по топику
   */
  const onClickTopicHandler = useCallback((id: string) => {
    onClickTopic?.(id);
  }, []);

  /**
   * Обработчик смены страницы
   */
  const onPageChangedHandler = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <Box className='topics-list'>
      <List>
        <ListSubheader className='topics-list__list-header'>
          <Typography variant='h6' className='topics-list__list-title'>
            Последние темы
          </Typography>
          <Tooltip title='Добавить тему'>
            <IconButton onClick={onCreateTopicHandler}>
              <AddConversationIcon />
            </IconButton>
          </Tooltip>
        </ListSubheader>
        <Divider />
        {topics.map((t) => (
          <TopicListItem
            {...t}
            key={t.id}
            onDelete={onDeleteTopicHandler}
            onEdit={onEditTopicHandler}
            onClick={onClickTopicHandler}
          />
        ))}
      </List>
      <Pagination
        size='small'
        className='topics-list__pagination'
        count={pagesCount}
        page={currentPage}
        onChange={onPageChangedHandler}
      />
    </Box>
  );
};
