import { FC } from 'react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { PenIcon, PictureIcon, TrashIcon } from '../../../assets';
import { TopicListItemProps } from './TopicListItemProps';
import { formatDate } from '../../../utils';
import { DATE_FORMAT } from '../../../constants/common';
import './topicListItemStyles.scss';

/**
 * Элемент списка топиков форума
 */
export const TopicListItem: FC<TopicListItemProps> = (props) => {
  const { createdAt, creator, id, messagesCount, title, viewsCount, onDelete, onEdit, onClick } =
    props;

  const creationDateFormatted = formatDate(createdAt, DATE_FORMAT);

  /**
   * Обработчик редактирования топика
   */
  const editTopicHandler = () => {
    onEdit?.(id);
  };

  /**
   * Обработчик удаления топика
   */
  const deleteTopicHandler = () => {
    onDelete?.(id);
  };

  /**
   * Обработчик клика по топику
   */
  const clickTopicHandler = () => {
    onClick?.(id);
  };

  return (
    <>
      <ListItem className='topic-list-item' onClick={clickTopicHandler}>
        <ListItemText
          className='topic-list-item__theme'
          primary={title}
          secondary={`Создана: ${creationDateFormatted}`}
        />
        <ListItemText
          className='topic-list-item__counters'
          primary={`Ответов: ${messagesCount ?? ''}`}
          secondary={`Просмотров: ${viewsCount}`}
        />
        <ListItemAvatar>
          <Avatar>
            <PictureIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className='topic-list-item__creator' primary={creator} />
        <ListItemSecondaryAction className='topic-list-item__actions-container'>
          <Box className='topic-list-item__actions-wrapper'>
            <Tooltip title='Редактировать тему'>
              <IconButton onClick={editTopicHandler}>
                <PenIcon width={18} height={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Удалить тему'>
              <IconButton onClick={deleteTopicHandler}>
                <TrashIcon width={18} height={18} />
              </IconButton>
            </Tooltip>
          </Box>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};
