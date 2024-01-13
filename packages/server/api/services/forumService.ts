import type {
  CreateCommentDto,
  CreateReplyDto,
  CreateTopicDto,
  UpdateCommentDto,
  UpdateReplyDto,
  UpdateTopicDto,
} from '../../dto';
import { CommentModel, ReplyModel, TopicModel, EmojiModel, ReactionModel } from '../../dal';
/* eslint-disable class-methods-use-this */
import type { Reaction } from '../../bll';

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
  public deleteComment = (id: number) => CommentModel.destroy({ where: { id } });

  /**
   * Получить кол-во ответов на комментарий
   */
  public getRepliesCount = (commentId: number) =>
    ReplyModel.count({
      where: {
        commentId,
      },
    });

  /**
   * Получить ответ по идентификатору
   */
  public getReplyById = (id: number) => ReplyModel.findByPk(id);

  /**
   * Получить ответы по идентификатору комментария
   */
  public getRepliesByCommentId = (commentId: number) =>
    ReplyModel.findAll({
      where: {
        commentId,
      },
    });

  /**
   * Добавить ответ
   */
  public addReply = (creationData: CreateReplyDto) => ReplyModel.create(creationData);

  /**
   * Изменить комментарий
   */
  public updateReply = (updateData: UpdateReplyDto) =>
    ReplyModel.update(
      {
        text: updateData.text,
      },
      { where: { id: updateData.id } }
    );

  /**
   * Удалить ответ
   */
  public deleteReply = (id: number) => ReplyModel.destroy({ where: { id } });

  public getAllEmoji = () => EmojiModel.findAll();

  public getReaction = (id: number) => ReactionModel.findByPk(id);

  public getAllTopicReactions = (topicId: number) => ReactionModel.findAll({ where: { topicId } });

  public addReactionToTopic = (reaction: Reaction) => ReactionModel.create(reaction);

  public deleteReactionFromTopic = (id: number) => ReactionModel.destroy({ where: { id } });
}
