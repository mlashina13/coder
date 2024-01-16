import { Router } from 'express';
import { forumRoutes } from './forumRoutes';
import { themeRoutes } from './themeRoutes';

const router: Router = Router();

forumRoutes(router);
themeRoutes(router);

export default router;
