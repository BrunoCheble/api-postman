import { Router } from 'express';
import multer from 'multer';
import SendEmailService from '../services/SendEmailService';
import uploadConfig from '../config/upload';

const emailRouter = Router();
const upload = multer(uploadConfig);

emailRouter.get('/', async (request, response) => {
  return response.json({
    message: process.env.EMAIL_FROM_DEFAULT,
  });
});

emailRouter.post(
  '/',
  upload.array('attachments'),
  async (request, response) => {
    const { from, emails, subject, body } = request.body;
    const files =
      request.files && !Array.isArray(request.files)
        ? request.files.attachments
        : request.files;

    const sendEmailService = new SendEmailService();
    const sent_emails = await sendEmailService.execute({
      from,
      emails,
      subject,
      body,
      files,
    });

    return response.json({ sent_emails });
  },
);

export default emailRouter;
