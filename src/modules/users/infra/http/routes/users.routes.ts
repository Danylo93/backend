import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/uploads';
import { container } from 'tsyringe';
import UsersController from '../controllers/UsersController';

import UserAvatarController from '../controllers/UserAvatarController';


import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';

const usersControllers = new UsersController;
const usersRouter = Router();
const upload = multer(uploadConfig);
const userAvatarController = new UserAvatarController();


usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
   usersControllers.create);


usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);
export default usersRouter;
