// import { ConfigModule, ConfigService } from '@nestjs/config';
// import {
//   TypeOrmModuleAsyncOptions,
//   TypeOrmModuleOptions,
// } from '@nestjs/typeorm';

// export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (): Promise<TypeOrmModuleOptions> => {
//     return {
//       type: 'postgres',
//       host: process.env.POSTGRESQL_HOST,
//       port: parseInt(process.env.POSTGRESQL_PORT, 10),
//       username: process.env.POSTGRESQL_USERNAME,
//       database: process.env.POSTGRESQL_DATABASE,
//       password: process.env.POSTGRESQL_PASSWORD,
//       entities: [__dirname + '/../**/*.entity.{js,ts}'],
//       migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//       extra: {
//         charset: 'utf8mb4_unicode_ci',
//       },
//       synchronize: false,
//       logging: true,
//     };
//   },
// };

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.POSTGRESQL_HOST,
//   port: parseInt(process.env.POSTGRESQL_PORT, 10),
//   username: process.env.POSTGRESQL_USERNAME,
//   database: process.env.POSTGRESQL_DATABASE,
//   password: process.env.POSTGRESQL_PASSWORD,
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//   extra: {
//     charset: 'utf8mb4_unicode_ci',
//   },
//   synchronize: false,
//   logging: true,
// };
