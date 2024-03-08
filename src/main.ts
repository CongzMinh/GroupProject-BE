import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const appPort = process.env.APP_PORT;
// const appEnv = process.env.APP_ENV
const prefix = process.env.APP_PREFIX;
const appName = process.env.APP_NAME;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(appName)
    .setDescription(appName)
    .setVersion(prefix)
    .addTag(prefix)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/swagger`, app, document);
  app.enableCors();
  await app.listen(appPort);
}
bootstrap();
