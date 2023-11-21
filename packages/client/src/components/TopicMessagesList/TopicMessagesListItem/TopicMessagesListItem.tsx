import { FC, useCallback } from 'react';
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
import { TopicMessagesListItemProps } from './TopicMessagesListItemProps';
import { formatDate } from '../../../utils';
import { DATE_FORMAT } from '../../../constants/common';
import './topicMessagesListItemStyles.scss';

/**
 * Компонент элемента списка сообщений топика
 */
export const TopicMessagesListItem: FC<TopicMessagesListItemProps> = (props) => {
  const { creationDate, creator, id, message, onDelete, onEdit } = props;

  const creationDateFormatted = formatDate(creationDate, DATE_FORMAT);

  /**
   * Обработчик редактирования сообщения
   */
  const editMessageHandler = useCallback(() => {
    onEdit?.(id);
  }, [onEdit]);

  /**
   * Обработчик удаления сообщения
   */
  const deleteMessageHandler = useCallback(() => {
    onDelete?.(id);
  }, [onDelete]);

  return (
    <>
      <ListItem className='topic-msgs-list-item'>
        <ListItemAvatar>
          <Avatar>
            <PictureIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          className='topic-msgs-list-item__message'
          primary={`${creationDateFormatted} ${creator}`}
          secondary={message}
        />
        <ListItemSecondaryAction className='topic-msgs-list-item__actions-container'>
          <Box className='topic-msgs-list-item__actions-wrapper'>
            <Tooltip title='Редактировать сообщение'>
              <IconButton onClick={editMessageHandler}>
                <PenIcon width={18} height={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Удалить сообщение'>
              <IconButton onClick={deleteMessageHandler}>
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
