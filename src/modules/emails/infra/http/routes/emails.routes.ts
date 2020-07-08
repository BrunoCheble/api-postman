import { Router } from 'express';

import SendEmailController from '../controllers/SendEmailsController';

const emailsRouter = Router();
const emailsController = new SendEmailController();

emailsRouter.post('/', emailsController.create);

export default emailsRouter;
