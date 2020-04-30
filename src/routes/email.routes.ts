import { Router } from 'express';
import SendEmailService from '../services/SendEmailService';

const emailRouter = Router();

emailRouter.get('/', async (request, response) => {
  return response.json({
    message: process.env.EMAIL_FROM_DEFAULT,
  });
});

emailRouter.post('/', async (request, response) => {
  const { from, emails, subject, body } = request.body;
  const sendEmailService = new SendEmailService();
  const sent_emails = await sendEmailService.execute({
    from,
    emails,
    subject,
    body,
  });
  return response.json({ sent_emails });
});

export default emailRouter;
