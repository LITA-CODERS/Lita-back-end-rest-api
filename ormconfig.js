module.exports = {
  type: '',
  port: '',
  host: '',
  username: '',
  password: '',
  database: '',
  migrations: ['./src/shared/infra/typeorm/migrations/**.ts'],
  entities: ['./src/modules/*/infra/typeorm/entities/**.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
    entities: './src/modules/*/infra/typeorm/entities/**.ts',
  },
};