import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendEmailService from '@modules/emails/services/SendEmailService';
import SendLogService from '@modules/emails/services/SendLogService';

export default class SendEmailsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      from,
      to,
      subject,
      body,
      application = 'Localhost',
      created_by = 'Me',
    } = request.body;

    const sendEmail = container.resolve(SendEmailService);
    const data = {
      from,
      application,
      body,
      created_by,
      subject,
      to,
    };

    await sendEmail.execute(data);

    const sendLog = container.resolve(SendLogService);

    sendLog.execute(data);

    return response.json(data);
  }
}
