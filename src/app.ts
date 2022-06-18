import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import SwaggerConfig from './SwaggerConfig';
import { ValidationPipe } from '@nestjs/common';

async function getApp() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  const config = SwaggerConfig.getConfig();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: false,
      enableDebugMessages: true,
    }),
  );

  return app;
}

export default getApp;
