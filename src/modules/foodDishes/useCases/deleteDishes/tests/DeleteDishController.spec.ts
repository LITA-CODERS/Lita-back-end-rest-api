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
let responseDish;
describe('Delete dishes controller', () => {
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
    const createDish: ICreateFoodDishesDTO = {
      name: 'teste',
      description: 'teste',
      price: '48',
      category_id: responseCategory.body.id,
    };
    responseDish = await request(app)
      .post(`/dish/`)
      .send(createDish)
      .set({
        Authorization: `Bearer ${token.body.token}`,
      });
  });

  it('should be able to delete a dish', async () => {
    await request(app)
      .delete(`/dish/${responseDish.body.id}`)
      .send()
      .set({
        Authorization: `Bearer ${token.body.token}`,
      })
      .expect(200);
  });
  it('should throw error if dish not exists', async () => {
    await request(app)
      .delete(`/dish/9b096f43-adff-470c-9261-552a1a94ef2e`)
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
