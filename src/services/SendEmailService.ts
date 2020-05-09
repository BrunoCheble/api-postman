import sgMail from '@sendgrid/mail';
import fs from 'fs';
import { AttachmentJSON } from '@sendgrid/helpers/classes/attachment';
import AppError from '../errors/AppError';

interface Request {
  from?: string;
  emails: string[] | string;
  subject: string;
  body: string;
  files?: Express.Multer.File[] | undefined;
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
    files,
  }: Request): Promise<string[]> {
    const apikey = process.env.SENDGRID_API_KEY || '';

    sgMail.setApiKey(apikey);

    const attachments: AttachmentJSON[] = [];
    try {
      if (files) {
        files.forEach(file => {
          attachments.push({
            content: fs.readFileSync(file.path).toString('base64'),
            filename: file.filename,
          });
          fs.unlinkSync(file.path);
        });
      }
    } catch (err) {
      throw new AppError('Houve um erro com os anexos, verifique os anexos.');
    }

    const TotalSizeFiles: number =
      files?.reduce((accumulator, file) => accumulator + file.size, 0) || 0;

    if (TotalSizeFiles > 5000000) {
      throw new AppError('O anexo ultrapassa o tamanho limite de 5mb.');
    }

    try {
      await sgMail.send({
        to: emails,
        from,
        subject,
        html: `<html><body>${body}</body></html>`,
        attachments,
      });

      this.emails = Array.isArray(emails) ? emails : [emails];
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
