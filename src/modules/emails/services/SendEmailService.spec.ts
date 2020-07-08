import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendEmailService from './SendEmailService';

let fakeMailProvider: FakeMailProvider;
let sendEmail: SendEmailService;

describe('CreateLog', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    sendEmail = new SendEmailService(fakeMailProvider);
  });
  it('should be able to send a new e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const data = {
      to: 'contato@email.com',
      subject: 'Teste',
      body: 'Conteúdo do e-mail',
      created_by: 'test',
      application: 'localhost',
    };
    await sendEmail.execute(data);
    expect(sendMail).toHaveBeenCalled();
  });
});
