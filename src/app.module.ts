import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeederModule } from './modules/seeder/seeder.module';
// import { typeOrmConfig } from './configs/typeorm.config';
import { dataSourceOptions } from './database/data-source';
// import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './modules/auth/roles.guard';
// import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerExampleModule } from './modules/throttler/throttler.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { RoomModule } from './modules/room/room.module';

import { PostModule } from './modules/room/room.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10000,
    }),
    ConfigModule.forRoot(),
    SeederModule,
    ThrottlerExampleModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: true,
          auth: {
            user: config.get('MAIL_ACCOUNT'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: __dirname + '/templates/email',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    PostModule,
    MulterModule.register({
      dest: './files',
    }),
    RoomModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer;
  }
}
