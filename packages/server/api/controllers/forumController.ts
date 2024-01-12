import type { Request, Response } from 'express';
import { ForumService } from '../services';

export class ForumController {
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

  public static updateTopic = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      await service.updateTopic(body.title, body.id);
      response.status(200).send('Successfully updated');
    } catch (error) {
      response.status(500).send(error);
    }
  };

  public static viewTopic = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const service = new ForumService();
      const topic = await service.getTopicById(body.id);
      if (topic) {
        const viewsCount = topic.viewsCount + 1;
        await service.viewTopic(topic.id, viewsCount);
        response.status(200).send({
          data: {
            viewsCount,
          },
        });
      } else {
        response.status(400).send('Topic not found');
      }
    } catch (error) {
      response.status(500).send(error);
    }
  };

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
}
