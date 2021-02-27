import { Router } from "express";

const usersRouter = Router();

usersRouter.get('/', (request, response) => {
  response.json({
    id: '1e222291-7492-4155-8d49-64038e2e2932',
    name: 'camilla',
  });
});

export default usersRouter;
