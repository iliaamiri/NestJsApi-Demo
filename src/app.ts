import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import SwaggerConfig from './SwaggerConfig';

async function getApp() {
  const app = await NestFactory.create(AppModule);

  const config = SwaggerConfig.getConfig();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app;
}

export default getApp;
