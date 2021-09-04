import { container } from 'tsyringe';
// import * as dotenv from 'dotenv';
import mailConfig from '@config/mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SendGridMailProvider from './implementations/SendGridMailProvider';

import IMailProvider from './models/IMailProvider';

// dotenv.config();
const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  sendgrid: container.resolve(SendGridMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
