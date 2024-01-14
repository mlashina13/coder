import { Op } from 'sequelize';
import type {
  CreateCommentDto,
  CreateReplyDto,
  CreateTopicDto,
  UpdateCommentDto,
  UpdateTopicDto,
} from '../../dto';
import { CommentModel, TopicModel } from '../../dal';

/**
 * Сервис для работы с форумом
 */
export class ForumService {
  /**
   * Получить список топиков
   */
  public getAllTopics = () => TopicModel.findAll();

  /**
   * Получить топик по идентификатору
   */
  public getTopicById = (id: number) => TopicModel.findByPk(id);

  /**
   * Создать топик
   */
  public createTopic = (creationData: CreateTopicDto) => TopicModel.create(creationData);

  /**
   * Изменить топик
   */
  public updateTopic = (updateData: UpdateTopicDto) =>
    TopicModel.update(
      {
        title: updateData.title,
      },
      { where: { id: updateData.id } }
    );

  /**
   * Добавить просмотр
   */
  public viewTopic = (id: number) => TopicModel.increment('viewsCount', { by: 1, where: { id } });

  /**
   * Удалить топик
   */
  public deleteTopic = (id: number) => TopicModel.destroy({ where: { id } });

  /**
   * Получить кол-во комментариев в топике
   */
  public getCommentsCount = (topicId: number) =>
    CommentModel.count({
      where: {
        topicId,
      },
    });

  /**
   * Получить комментарий по идентификатору топика
   */
  public getCommentsByTopicId = (topicId: number) =>
    CommentModel.findAll({
      where: {
        topicId,
        parentId: null,
      },
    });

  /**
   * Получить комментарий по идентификатору
   */
  public getCommentById = (id: number) => CommentModel.findByPk(id);

  /**
   * Добавить комментарий
   */
  public addComment = (creationData: CreateCommentDto) => CommentModel.create(creationData);

  /**
   * Изменить комментарий
   */
  public updateComment = (updateData: UpdateCommentDto) =>
    CommentModel.update(
      {
        text: updateData.text,
      },
      { where: { id: updateData.id } }
    );

  /**
   * Удалить комментарий
   */
  public deleteComment = (id: number) =>
    CommentModel.destroy({
      where: { [Op.or]: [{ id }, { parentId: id }] },
    });

  /**
   * Получить ответы по идентификатору комментария
   */
  public getRepliesByCommentId = (commentId: number) =>
    CommentModel.findAll({
      where: {
        parentId: commentId,
      },
    });

  /**
   * Добавить ответ
   */
  public addReply = (creationData: CreateReplyDto) => CommentModel.create(creationData);
}
