import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';
import UsersController from '../controllers/UsersController';

import UserAvatarController from '../controllers/UserAvatarController';


import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersControllers = new UsersController;
const usersRouter = Router();
const upload = multer(uploadConfig);
const userAvatarController = new UserAvatarController();
usersRouter.post('/', usersControllers.create);
  

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);
export default usersRouter;
