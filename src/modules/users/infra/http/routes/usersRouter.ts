import { Router } from "express";

import UserController from '@modules/users/infra/http/controllers/UserController';

const usersRouter = Router();

const userController = new UserController();

usersRouter.post('/', userController.create);

export default usersRouter;
