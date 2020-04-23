import { Router } from 'express';
// import SendEmailService from '../services/SendEmailService';

const emailRouter = Router();

emailRouter.get('/', (request, response) => {
  try {
    // const sendEmailService = new SendEmailService();

    return response.json({ message: 'estou aqui' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default emailRouter;
