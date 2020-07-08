import { Router } from 'express';

import emailsRouter from '@modules/emails/infra/http/routes/emails.routes';

const routes = Router();

routes.use('/', emailsRouter);

export default routes;
