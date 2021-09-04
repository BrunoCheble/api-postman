import { injectable, inject } from 'tsyringe';

import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendEmailDTO from '@modules/emails/dtos/ISendEmailDTO';
import AppError from '@shared/errors/AppError';

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

    const sent = await this.mailProvider.sendMail({
      subject,
      templateData: {
        file: defaultTemplate,
        variables: {
          application: application || 'Localhost',
          created_by: created_by || 'Me',
          body,
        },
      },
      to,
      from,
    });

    if (sent === false) {
      throw new AppError('Houve um erro ao enviar o e-mail!');
    }
  }
}

export default SendEmailService;
