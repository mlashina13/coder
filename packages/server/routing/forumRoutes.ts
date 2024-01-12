import { Router } from 'express';
import { ForumController } from '../api';

export const forumRoutes = (router: Router) => {
  const forumRouter = Router();

  forumRouter
    .get('/topics/', ForumController.getAllTopics)
    .get('/topics/:id', ForumController.getTopicById)
    .post('/topic/', ForumController.createTopic)
    .patch('/topic/', ForumController.updateTopic)
    .delete('/topic/', ForumController.deleteTopic)
    .patch('/viewTopic/', ForumController.viewTopic);

  router.use('/forum', forumRouter);
};
