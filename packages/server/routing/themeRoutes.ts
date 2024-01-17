import { Router } from 'express';
import { ThemeController } from '../api';

export const themeRoutes = (router: Router) => {
  const themeRouter = Router();

  themeRouter.get('/:id', ThemeController.getTheme).post('/save', ThemeController.saveTheme);

  router.use('/theme', themeRouter);
};
