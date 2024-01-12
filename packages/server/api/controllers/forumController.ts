import type { Request, Response } from 'express';
import { ForumService } from '../services';

/**
 * API контроллер форума
 */
export class ForumController {
  /**
   * Получить список топиков
   */
  public static getAllTopics = async (_: Request, response: Response) => {
    try {
      const service = new ForumService();
      const topics = await service.getAllTopics();
      response.status(200).send({
        data: topics,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Получить топик по идентификатору
   */
  public static getTopicById = async (request: Request, response: Response) => {
    try {
      const {
        params: { id },
      } = request;
      if (!id) {
        response.status(400).send("Parameter ':Id' can not be empty");
      } else {
        const service = new ForumService();
        const topic = await service.getTopicById(+id);
        response.status(200).send({
          data: topic,
        });
      }
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Создать топик
   */
  public static createTopic = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      const topic = await service.createTopic(body);
      response.status(200).send({
        data: topic,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Изменить топик
   */
  public static updateTopic = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      await service.updateTopic(body);
      response.status(200).send('Successfully updated');
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Добавить просмотр
   */
  public static viewTopic = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      await service.viewTopic(body.id);
      response.status(200).send('Views count incremented');
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Удалить топик
   */
  public static deleteTopic = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      await service.deleteTopic(body.id);
      response.status(200).send('Successfully deleted');
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Получить список комментариев топика
   */
  public static getTopicComments = async (request: Request, response: Response) => {
    try {
      const {
        params: { topicId },
      } = request;
      if (!topicId) {
        response.status(400).send("Parameter ':topicId' can not be empty");
      } else {
        const service = new ForumService();
        const comments = await service.getCommentsByTopicId(+topicId);
        response.status(200).send({
          data: comments,
        });
      }
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Добавить комментарий
   */
  public static addComment = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      const comment = await service.addComment(body);
      await service.changeTopicMessagesCount({
        id: body.topicId,
        incrementCount: 1,
      });
      response.status(200).send({
        data: comment,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Изменить комментарий
   */
  public static updateComment = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      await service.updateComment(body);
      response.status(200).send('Successfully updated');
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Удалить комментарий
   */
  public static deleteComment = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      const comment = await service.getCommentById(body.id);
      if (comment) {
        const { id, topicId } = comment;
        const repliesCount = await service.getRepliesCount(id);
        await service.deleteComment(id);
        await service.changeTopicMessagesCount({
          id: topicId,
          incrementCount: -(repliesCount + 1),
        });
        response.status(200).send('Successfully deleted');
      } else {
        response.status(400).send('Comment not found');
      }
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Получить список ответов на комментарий
   */
  public static getCommentReplies = async (request: Request, response: Response) => {
    try {
      const {
        params: { commentId },
      } = request;
      if (!commentId) {
        response.status(400).send("Parameter ':commentId' can not be empty");
      } else {
        const service = new ForumService();
        const replies = await service.getRepliesByCommentId(+commentId);
        response.status(200).send({
          data: replies,
        });
      }
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Добавить ответ
   */
  public static addReply = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      const comment = await service.getCommentById(body.commentId);
      if (comment) {
        const reply = await service.addReply(body);
        await service.changeTopicMessagesCount({
          id: comment.topicId,
          incrementCount: 1,
        });
        response.status(200).send({
          data: reply,
        });
      } else {
        response.status(400).send('You can not add reply without comment');
      }
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Изменить ответ
   */
  public static updateReply = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      await service.updateReply(body);
      response.status(200).send('Successfully updated');
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Удалить ответ
   */
  public static deleteReply = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      const reply = await service.getReplyById(body.id);
      if (reply) {
        const { id, commentId } = reply;
        await service.deleteReply(id);
        const parentComment = await service.getCommentById(commentId);
        if (parentComment) {
          await service.changeTopicMessagesCount({
            id: parentComment.topicId,
            incrementCount: -1,
          });
        }
        response.status(200).send('Successfully deleted');
      } else {
        response.status(400).send('Reply not found');
      }
    } catch (error) {
      response.status(500).send(error);
    }
  };
}
