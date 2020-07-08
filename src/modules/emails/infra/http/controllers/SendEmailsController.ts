import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendEmailService from '@modules/emails/services/SendEmailService';
/*
import multer from 'multer';
import SendEmailService from '../services/SendEmailService';
import uploadConfig from '../config/upload';
*/
export default class SendEmailsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      to,
      subject,
      body,
      application = 'Localhost',
      created_by = 'Me',
    } = request.body;
    /*
    const files =
      request.files && !Array.isArray(request.files)
        ? request.files.attachments
        : request.files;
    */
    const sendEmail = container.resolve(SendEmailService);

    const emails = await sendEmail.execute({
      application,
      body,
      created_by,
      subject,
      to,
    });

    return response.json(emails);
  }
}
