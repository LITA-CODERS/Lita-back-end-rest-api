import request from 'supertest';
import { Connection } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { app } from '@shared/infra/http/app';
import { connection } from '@shared/infra/typeorm';

let db: Connection;
let token;
let responseUser;
let responseCategories;
describe('List categories controller', () => {
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
    responseCategories = await request(app)
      .post(`/categories/`)
      .send({
        name: 'teste ',
      })
      .set({
        Authorization: `Bearer ${token.body.token}`,
      });
  });

  it('should be able to list a categories', async () => {
    await request(app)
      .get(`/categories`)
      .send()
      .set({
        Authorization: `Bearer ${token.body.token}`,
      })
      .expect(200);
  });
  it('should throw error if list categories not exists', async () => {
    await request(app)
      .delete(`/categories/${responseCategories.body.id}`)
      .set({
        Authorization: `Bearer ${token.body.token}`,
      });
    await request(app)
      .get(`/categories`)
      .send()
      .set({
        Authorization: `Bearer ${token.body.token}`,
      })
      .expect(404);
  });
  afterAll(async () => {
    await db.query(
      'drop table food_dishes; drop table categories; drop table users; drop table migrations;'
    );
    await db.close();
  });
});
