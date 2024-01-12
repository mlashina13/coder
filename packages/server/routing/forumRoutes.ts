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
    .patch('/viewTopic/', ForumController.viewTopic)
    .post('/comment/', ForumController.addComment)
    .patch('/comment/', ForumController.updateComment)
    .delete('/comment/', ForumController.deleteComment)
    .get('/comments/:topicId', ForumController.getTopicComments)
    .post('/reply/', ForumController.addReply)
    .patch('/reply/', ForumController.updateReply)
    .delete('/reply/', ForumController.deleteReply)
    .get('/replies/:commentId', ForumController.getCommentReplies);

  router.use('/forum', forumRouter);
};
