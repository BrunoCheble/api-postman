import { createTransport } from 'nodemailer';
import stmp from '../config/smtp';
import AppError from '../errors/AppError';

interface Request {
  emails: string[];
  subject: string;
  body: string;
}

class SendEmailService {
  private emails: string[];

  constructor() {
    this.emails = [];
  }

  public async execute({ emails, subject, body }: Request): Promise<string[]> {
    const transporter = createTransport(stmp);
    await new Promise(resolve => {
      transporter.sendMail(
        {
          from: stmp.auth.user,
          to: emails,
          subject,
          html: `<html><body>${body}</body></html>`,
        },
        error => {
          if (error) {
            throw new AppError(error.message, 401);
          } else {
            this.emails = emails;
          }
          resolve();
        },
      );
    });

    return this.emails;
  }
}

export default SendEmailService;
