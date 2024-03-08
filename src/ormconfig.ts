// TODO : Used to run the command seed:run but am having an unresolved bug
export default {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: +process.env.POSTGRESQL_PORT,
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
  seeds: ['dist/database/seeding/seeds/**/*{.ts,.js}'],
  factories: ['dist/database/seeding/factories/**/*{.ts,.js}'],
};
