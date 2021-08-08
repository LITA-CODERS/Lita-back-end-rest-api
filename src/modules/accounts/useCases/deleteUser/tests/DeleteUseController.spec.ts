import request from 'supertest';
import { Connection } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { app } from '@shared/infra/http/app';
import { connection } from '@shared/infra/typeorm';

let db: Connection;
let token;
let responseUser;
describe('Delete user controller', () => {
  beforeAll(async () => {
    db = await connection();
    await db.runMigrations();
    const createUserDTO: ICreateUserDTO = {
      name: 'test',
      email: 'email@gmail.com',
      password: 'password',
    };
    responseUser = await request(app)
      .post('/accounts/users')
      .send(createUserDTO);
    token = await request(app).post('/accounts/login').send({
      email: 'email@gmail.com',
      password: 'password',
    });
  });

  it('should be able to delete a user', async () => {
    const createUserDTO: ICreateUserDTO = {
      name: 'test2',
      email: 'email2@gmail.com',
      password: 'password',
    };
    const response = await request(app)
      .post('/accounts/users')
      .send(createUserDTO);
    await request(app)
      .delete(`/accounts/user/${response.body.id}`)
      .send()
      .set({
        Authorization: `Bearer ${token.body.token}`,
      })
      .expect(200);
  });
  it('should throw error if delete user not exists', async () => {
    await request(app)
      .delete('/accounts/user/7a17ce27-db6a-479d-91bd-71400a9b08de')
      .send()
      .set({
        Authorization: `Bearer ${token.body.token}`,
      })
      .expect(404);
  });
  it('should throw error if not authenticate', async () => {
    await request(app)
      .delete(`/accounts/user/${responseUser.body.id}`)
      .send()
      .expect(401);
  });
  afterAll(async () => {
    await db.query(
      'drop table food_dishes; drop table categories; drop table users; drop table migrations;'
    );
    await db.close();
  });
});
