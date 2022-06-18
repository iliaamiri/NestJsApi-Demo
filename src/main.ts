import getApp from './app';

async function bootstrap() {
  const app = await getApp();

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
