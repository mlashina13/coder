/* eslint-disable class-methods-use-this */
import type { Topic } from '../../bll';
import { TopicModel } from '../../dal';

export class ForumService {
  public getAllTopics = () => TopicModel.findAll();

  public getTopicById = (id: number) => TopicModel.findByPk(id);

  public createTopic = (topic: Topic) => TopicModel.create(topic);

  public updateTopic = (title: string, id: number) =>
    TopicModel.update(
      {
        title,
      },
      { where: { id } }
    );

  public viewTopic = (id: number, viewsCount: number) =>
    TopicModel.update(
      {
        viewsCount,
      },
      { where: { id } }
    );

  public deleteTopic = (id: number) => TopicModel.destroy({ where: { id } });
}
