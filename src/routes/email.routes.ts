import { Router } from 'express';
import SendEmailService from '../services/SendEmailService';

const emailRouter = Router();

emailRouter.get('/', async (request, response) => {
  return response.json({ message: 'estou aqui' });
});

emailRouter.post('/', async (request, response) => {
  const { emails, subject, body } = request.body;
  const sendEmailService = new SendEmailService();
  const sended = await sendEmailService.execute({ emails, subject, body });
  return response.json({ sended });
});

export default emailRouter;
