import { injectable } from 'tsyringe';
import axios from 'axios';

import ISendLogDTO from '@modules/emails/dtos/ISendLogDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class SendLogService {
  public async execute({
    from,
    to,
    subject,
    body,
    created_by,
    application,
  }: ISendLogDTO): Promise<void> {
    const url_api = process.env.URL_API_LOGME || '';

    if (url_api === '') {
      throw new AppError('URL_API_LOGME é obrigatório!');
    }

    const response = await axios.post(url_api, {
      type: 'SUCCESS',
      application: 'PostMan',
      description: 'Envio de e-mail',
      created_by: created_by || 'Me',
      details: {
        from,
        to,
        subject,
        body,
        application: application || 'Localhost',
      },
    });

    if (response.status !== 200) {
      console.log(response.data);
      // throw new AppError('O serviço sendLogService falhou.');
    }
  }
}

export default SendLogService;
