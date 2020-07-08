import { injectable, inject } from 'tsyringe';
import sgMail from '@sendgrid/mail';

import AppError from '@shared/errors/AppError';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class SGMailProvider implements IMailProvider {
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const apikey = process.env.API_SENDGRIDMAIL || '';
    sgMail.setApiKey(apikey);
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    try {
      await sgMail.send({
        to,
        from: {
          name: from?.name || 'Bruno Azevedo',
          email: from?.email || 'bruno.azevedo@extrabite.pt',
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });
    } catch (err) {
      throw new AppError('Houve um erro ao tentar enviar a mensagem.');
    }
  }
}
