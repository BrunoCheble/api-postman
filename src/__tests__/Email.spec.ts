import request from 'supertest';
import app from '../app';

describe('Email', () => {
  it('should be able to execute a email route', async () => {
    const response = await request(app).get('/emails');

    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'estou aqui',
      }),
    );
  });
});
