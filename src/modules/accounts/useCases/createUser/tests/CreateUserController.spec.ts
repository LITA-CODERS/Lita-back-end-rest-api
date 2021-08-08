import request from 'supertest';
import { Connection } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { app } from '@shared/infra/http/app';
import { connection } from '@shared/infra/typeorm';

let db: Connection;
describe('Create user controller', () => {
  beforeAll(async () => {
    db = await connection();
    await db.runMigrations();
  });

  it('should be able to create a new user', async () => {
    const createUserDTO: ICreateUserDTO = {
      name: 'test',
      email: 'email@gmail.com',
      password: 'password',
    };
    const response = await request(app)
      .post('/accounts/users')
      .send(createUserDTO);
    expect(response.status).toBe(201);
  });
  it('should throw error if user already exists', async () => {
    const createUserDTO: ICreateUserDTO = {
      name: 'test',
      email: 'email@gmail.com',
      password: 'password',
    };
    const response = await request(app)
      .post('/accounts/users')
      .send(createUserDTO);
    expect(response.status).toBe(400);
  });
  it('should throw error if user incorrect e-mail', async () => {
    const createUserDTO: ICreateUserDTO = {
      name: 'test',
      email: '',
      password: 'password',
    };
    const response = await request(app)
      .post('/accounts/users')
      .send(createUserDTO);
    expect(response.status).toBe(400);
  });
  afterAll(async () => {
    await db.query(
      'drop table food_dishes; drop table categories; drop table users; drop table migrations;'
    );
    await db.close();
  });
});
