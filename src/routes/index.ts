import { Router } from 'express';
import emailRouter from './email.routes';

const routes = Router();

routes.use('/emails', emailRouter);

export default routes;
