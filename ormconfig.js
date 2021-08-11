module.exports = {
  type: 'postgres',
  url: process.env.DB_URL,
  migrations: ['./src/shared/infra/typeorm/migrations/**.ts'],
  entities: ['./src/modules/*/infra/typeorm/entities/**.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
    entities: './src/modules/*/infra/typeorm/entities/**.ts',
  },
};
