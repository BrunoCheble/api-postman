import sgMail from '@sendgrid/mail';
import AppError from '../errors/AppError';

interface Request {
  from?: string;
  emails: string[];
  subject: string;
  body: string;
}

class SendEmailService {
  private emails: string[];

  constructor() {
    this.emails = [];
  }

  public async execute({
    from = process.env.EMAIL_FROM_DEFAULT || '',
    emails,
    subject,
    body,
  }: Request): Promise<string[]> {
    const apikey = process.env.SENDGRID_API_KEY || '';

    sgMail.setApiKey(apikey);

    try {
      await sgMail.send({
        to: emails,
        from,
        subject,
        html: `<html><body>${body}</body></html>`,
      });
      this.emails = emails;
    } catch (err) {
      console.log(from);
      console.log(apikey);
      console.log(err.response.body);
      throw new AppError('Houve um erro ao tentar enviar a mensagem.');
    }

    return this.emails;
  }
}

export default SendEmailService;
