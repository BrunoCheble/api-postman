import { injectable, inject } from 'tsyringe';
import axios from 'axios';

import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendEmailDTO from '@modules/emails/dtos/ISendEmailDTO';

@injectable()
class SendEmailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    from,
    to,
    subject,
    body,
    created_by,
    application,
  }: ISendEmailDTO): Promise<void> {
    const defaultTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'default_template.hbs',
    );

    this.mailProvider.sendMail({
      subject,
      templateData: {
        file: defaultTemplate,
        variables: {
          application,
          created_by,
          body,
        },
      },
      to,
      from,
    });

    axios.post(process.env.URL_API_LOGME || '', {
      type: 'SUCCESS',
      application: 'PostMan',
      description: 'Envio de e-mail',
      created_by,
      details: {
        from,
        to,
        subject,
        body,
        application,
      },
    });
  }
}

export default SendEmailService;
