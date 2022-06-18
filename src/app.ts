import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function getApp() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PokcerVancApp Backend API')
    .setDescription(
      'This API serves the PokerVancApp Frontend React.js application.',
    )
    .setVersion('1.0.0')
    .setContact(
      'PokerVancApp',
      'support@pokervanc.com',
      'https://pokervanc.com',
    )
    .setLicense(
      'Apache 2.0',
      'https://www.apache.org/licenses/LICENSE-2.0.html',
    )
    .setBasePath('/api/v1')
    .addBearerAuth({
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Bearer token',
      bearerFormat: 'Bearer {token}',
    })
    .addServer('http://localhost:8080/api/v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app;
}

export default getApp;
