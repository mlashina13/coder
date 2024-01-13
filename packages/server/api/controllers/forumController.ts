import type { Request, Response } from 'express';
import { ForumService } from '../services';
import type { RequestWithUser } from '../../types';

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
      const { currentUser } = request as RequestWithUser;
      const { body } = request;
      const service = new ForumService();
      const topic = await service.createTopic({
        ...body,
        authorId: currentUser.id,
      });
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
      const { currentUser } = request as RequestWithUser;
      const { body } = request;
      const service = new ForumService();
      const topic = await service.getTopicById(body.id);
      if (topic && topic.authorId === currentUser.id) {
        await service.updateTopic(body);
        response.status(200).send('Successfully updated');
      } else {
        response
          .status(400)
          .send(
            !topic
              ? 'Topic not found'
              : "You can't edit topic, because you are not an author of the topic"
          );
      }
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
      const { currentUser } = request as RequestWithUser;
      const service = new ForumService();
      const topic = await service.getTopicById(body.id);
      if (topic && topic.authorId === currentUser.id) {
        await service.deleteTopic(body.id);
        response.status(200).send('Successfully deleted');
      } else {
        response
          .status(400)
          .send(
            !topic
              ? 'Topic not found'
              : "You can't delete topic, because you are not an author of the topic"
          );
      }
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Получить кол-во сообщений в топике
   */
  public static getTopicMessagesCount = async (request: Request, response: Response) => {
    try {
      const {
        params: { topicId },
      } = request;
      if (!topicId) {
        response.status(400).send("Parameter ':topicId' can not be empty");
      } else {
        let count = 0;
        const service = new ForumService();
        const comments = await service.getCommentsByTopicId(+topicId);
        count = comments.length;
        comments.forEach(async (c) => {
          count += await service.getRepliesCount(c.id);
        });
        response.status(200).send({
          data: count,
        });
      }
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
      const { currentUser } = request as RequestWithUser;
      const service = new ForumService();
      const comment = await service.addComment({
        ...body,
        authorId: currentUser.id,
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
      const { currentUser } = request as RequestWithUser;
      const service = new ForumService();
      const comment = await service.getCommentById(body.id);
      if (comment && comment.authorId === currentUser.id) {
        await service.updateComment(body);
        response.status(200).send('Successfully updated');
      } else {
        response
          .status(400)
          .send(
            !comment
              ? 'Comment not found'
              : "You can't update comment, because you are not an author of the comment"
          );
      }
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
      const { currentUser } = request as RequestWithUser;
      const service = new ForumService();
      const comment = await service.getCommentById(body.id);
      if (comment && comment.authorId === currentUser.id) {
        await service.deleteComment(body.id);
        response.status(200).send('Successfully deleted');
      } else {
        response
          .status(400)
          .send(
            !comment
              ? 'Comment not found'
              : "You can't delete comment, because you are not an author of the comment"
          );
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
      const { currentUser } = request as RequestWithUser;
      const service = new ForumService();
      const comment = await service.getCommentById(body.commentId);
      if (comment) {
        const reply = await service.addReply({
          ...body,
          authorId: currentUser.id,
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
      const { currentUser } = request as RequestWithUser;
      const service = new ForumService();
      const reply = await service.getReplyById(body.id);
      if (reply && reply.authorId === currentUser.id) {
        await service.updateReply(body);
        response.status(200).send('Successfully updated');
      } else {
        response
          .status(400)
          .send(
            !reply
              ? 'Reply not found'
              : "You can't edit reply, because you are not an author of the reply"
          );
      }
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
      const { currentUser } = request as RequestWithUser;
      const service = new ForumService();
      const reply = await service.getReplyById(body.id);
      if (reply && reply.authorId === currentUser.id) {
        await service.deleteReply(body.id);
        response.status(200).send('Successfully deleted');
      } else {
        response
          .status(400)
          .send(
            !reply
              ? 'Reply not found'
              : "You can't delete reply, because you are not an author of the reply"
          );
      }
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Получить все эмодзи
   */
  public static getAllEmoji = async (_: Request, response: Response) => {
    try {
      const service = new ForumService();
      const emoji = await service.getAllEmoji();
      response.status(200).send({
        data: emoji,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Получить все реакции на топик
   */
  public static getAllTopicReactions = async (request: Request, response: Response) => {
    try {
      const {
        params: { topicId },
      } = request;
      if (!topicId) {
        response.status(400).send("Parameter ':topicId' can not be empty");
      } else {
        const service = new ForumService();
        const reactions = await service.getAllTopicReactions(+topicId);
        response.status(200).send({
          data: reactions,
        });
      }
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Добавить реакцию на топик
   */
  public static addReactionToTopic = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const { currentUser } = request as RequestWithUser;
      const service = new ForumService();
      body.userId = currentUser.id;
      const reactions = await service.addReactionToTopic(body);
      response.status(200).send({
        data: reactions,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  };

  /**
   * Удалить реакцию на топик
   */
  public static deleteReactionFromTopic = async (request: Request, response: Response) => {
    try {
      const {
        params: { id },
      } = request;
      const { currentUser } = request as RequestWithUser;
      const service = new ForumService();
      const reaction = await service.getReaction(+id);
      if (reaction && reaction.userId === currentUser.id) {
        await service.deleteReactionFromTopic(+id);
        response.status(200).send('Successfully deleted');
      } else {
        response
          .status(400)
          .send(
            !reaction
              ? 'Reaction not found'
              : "You can't delete reaction, because you are not an author of the reaction"
          );
      }
    } catch (error) {
      response.status(500).send(error);
    }
  };
}
