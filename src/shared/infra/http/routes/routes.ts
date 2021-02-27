import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/usersRouter';

const routes = Router();

routes.use('/users', usersRoutes);

export default routes;