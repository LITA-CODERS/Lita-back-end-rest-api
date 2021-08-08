import request from 'supertest';
import { Connection } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { ICreateFoodDishesDTO } from '@modules/foodDishes/dtos/ICreateFoodDishes';
import { app } from '@shared/infra/http/app';
import { connection } from '@shared/infra/typeorm';

let db: Connection;
let token;
let responseUser;
let responseCategory;
describe('Create dishes controller', () => {
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
    responseCategory = await request(app)
      .post(`/categories/`)
      .send({
        name: 'teste ',
      })
      .set({
        Authorization: `Bearer ${token.body.token}`,
      });
  });

  it('should be able to create a dish', async () => {
    const createDish: ICreateFoodDishesDTO = {
      name: 'teste',
      description: 'teste',
      price: '48',
      category_id: responseCategory.body.id,
    };
    await request(app)
      .post(`/dish/`)
      .send(createDish)
      .set({
        Authorization: `Bearer ${token.body.token}`,
      })
      .expect(201);
  });
  it('should throw error if category_id  invalid', async () => {
    const createDish: ICreateFoodDishesDTO = {
      name: 'teste',
      description: 'teste',
      price: '48',
      category_id: '9b096f43-adff-470c-9261-552a1a94ef2e',
    };
    await request(app)
      .post(`/dish/`)
      .send(createDish)
      .set({
        Authorization: `Bearer ${token.body.token}`,
      })
      .expect(500);
  });
  afterAll(async () => {
    await db.query(
      'drop table food_dishes; drop table categories; drop table users; drop table migrations;'
    );
    await db.close();
  });
});
