import request from 'supertest';
import app from '../app';

describe('Email', () => {
  it('should be able to execute a sending email route', async () => {
    const response = await request(app)
      .post('/emails')
      .send({
        emails: ['contato.cheble@gmail.com'],
        subject: 'Test Sending email',
        body: '<h1>Great! The test passed</h1>',
        category: 'Eletronics',
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        sent_emails: ['contato.cheble@gmail.com'],
      }),
    );
  });
});
