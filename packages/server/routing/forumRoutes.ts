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
    .get('/getTopicMessagesCount/:topicId/', ForumController.getTopicMessagesCount)
    .post('/comment/', ForumController.addComment)
    .patch('/comment/', ForumController.updateComment)
    .delete('/comment/', ForumController.deleteComment)
    .get('/comments/:topicId', ForumController.getTopicComments)
    .post('/reply/', ForumController.addReply)
    .get('/replies/:commentId', ForumController.getCommentReplies)
    .get('/emoji/', ForumController.getAllEmoji)
    .get('/reactions/:topicId', ForumController.getAllTopicReactions)
    .post('/reaction/:topicId', ForumController.addReactionToTopic)
    .delete('/reaction/:id', ForumController.deleteReactionFromTopic);

  router.use('/forum', forumRouter);
};
