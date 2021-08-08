import request from 'supertest';
import { Connection } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { app } from '@shared/infra/http/app';
import { connection } from '@shared/infra/typeorm';

let db: Connection;
describe('Authenticate user controller', () => {
  beforeAll(async () => {
    db = await connection();
    await db.runMigrations();

    const createUserDTO: ICreateUserDTO = {
      name: 'test',
      email: 'email@gmail.com',
      password: 'password',
    };
    await request(app).post('/accounts/users').send(createUserDTO);
  });

  it('should be able to authenticate user', async () => {
    const response = await request(app).post('/accounts/login').send({
      email: 'email@gmail.com',
      password: 'password',
    });
    expect(response.status).toBe(200);
    expect(response).toHaveProperty('body.token');
  });
  it('should throw error if authenticate user incorrect e-mail', async () => {
    const response = await request(app).post('/accounts/login').send({
      email: 'email2@gmail.com',
      password: 'password',
    });
    expect(response.status).toBe(401);
  });
  it('should throw error if authenticate user incorrect password', async () => {
    const response = await request(app).post('/accounts/login').send({
      email: 'email2@gmail.com',
      password: '2',
    });
    expect(response.status).toBe(401);
  });
  afterAll(async () => {
    await db.query(
      'drop table food_dishes; drop table categories; drop table users; drop table migrations;'
    );
    await db.close();
  });
});
