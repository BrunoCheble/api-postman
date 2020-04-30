import { Router } from 'express';
import SendEmailService from '../services/SendEmailService';

const emailRouter = Router();

emailRouter.get('/', async (request, response) => {
  return response.json({
    message: process.env.FROMEMAIL,
    teste: process.env.PASSEMAIL,
  });
});

emailRouter.post('/', async (request, response) => {
  const { from = '', emails, subject, body } = request.body;
  const sendEmailService = new SendEmailService();
  const sended = await sendEmailService.execute({
    from,
    emails,
    subject,
    body,
  });
  return response.json({ sended });
});

export default emailRouter;
