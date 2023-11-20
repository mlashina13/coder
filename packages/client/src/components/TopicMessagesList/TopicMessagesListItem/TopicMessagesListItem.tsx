import { FC } from 'react';
import { format } from 'date-fns';
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
import './topicMessagesListItemStyles.scss';

/**
 * Компонент элемента списка сообщений топика
 */
export const TopicMessagesListItem: FC<TopicMessagesListItemProps> = (props) => {
  const { creationDate, creator, id, message, onDelete, onEdit } = props;

  const creationDateFormatted = format(new Date(creationDate), 'dd.MM.yyyy');

  /**
   * Обработчик редактирования сообщения
   */
  const editMessageHandler = () => {
    onEdit && onEdit(id);
  };

  /**
   * Обработчик удаления сообщения
   */
  const deleteMessageHandler = () => {
    onDelete && onDelete(id);
  };

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