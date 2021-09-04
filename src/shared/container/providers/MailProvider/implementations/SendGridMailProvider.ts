import { injectable, inject } from 'tsyringe';
import sgMail from '@sendgrid/mail';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class SGMailProvider implements IMailProvider {
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<boolean> {
    const api_key = process.env.API_SENDGRIDMAIL || '';

    sgMail.setApiKey(api_key);

    const html = await this.mailTemplateProvider.parse(templateData);
    const formatted_from = {
      name: from?.name || process.env.DEFAULT_FROM_NAME || 'Bruno Azevedo',
      email:
        from?.email ||
        process.env.DEFAULT_FROM_EMAIL ||
        'bruno.azevedo@extrabite.pt',
    };

    console.log({
      api_key,
      to,
      formatted_from,
      subject,
    });

    const response = await sgMail
      .send({
        to,
        from: formatted_from,
        subject,
        html,
      })
      .catch((err) => {
        console.log(err.response.body);
        return false;
      });

    return response !== false;
  }
}
