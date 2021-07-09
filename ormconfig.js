module.exports = {
  type: process.env.DB_TYPE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['./src/shared/infra/typeorm/migrations/**.ts'],
  entities: ['./src/modules/*/infra/typeorm/entities/**.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
    entities: './src/modules/*/infra/typeorm/entities/**.ts',
  },
};
