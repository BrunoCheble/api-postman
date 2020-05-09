import request from 'supertest';
import path from 'path';
import app from '../app';

describe('Email', () => {
  it('should be able to execute a sending email route', async () => {
    const response = await request(app)
      .post('/emails')
      .send({
        emails: ['contato.cheble@gmail.com'],
        subject: 'Test Sending email',
        body: '<h1>Great! The test passed</h1>',
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        sent_emails: ['contato.cheble@gmail.com'],
      }),
    );
  });

  it('should be able to execute a sending email route with attachments', async () => {
    const attachment = path.resolve(__dirname, 'attachment.jpg');
    const response = await request(app)
      .post('/emails')
      .field('emails', 'contato.cheble@gmail.com')
      .field('subject', 'Test Sending email with attachment')
      .field('body', '<h1>Great! The test with attachment passed!</h1>')
      .attach('attachments', attachment);

    expect(response.body).toEqual(
      expect.objectContaining({
        sent_emails: ['contato.cheble@gmail.com'],
      }),
    );
  });
});
