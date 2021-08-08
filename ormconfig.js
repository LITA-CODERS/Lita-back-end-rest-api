module.exports = {
  type: 'postgres',
  url: 'postgres://yhpxajwx:kOdorQ2jUvX4OwQ7wIYNqGK7Uk8Ze9O1@chunee.db.elephantsql.com/yhpxajwx',
  migrations: ['./src/shared/infra/typeorm/migrations/**.ts'],
  entities: ['./src/modules/*/infra/typeorm/entities/**.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
    entities: './src/modules/*/infra/typeorm/entities/**.ts',
  },
};
