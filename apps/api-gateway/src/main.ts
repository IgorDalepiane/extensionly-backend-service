import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: 'Content-Type, Authorization, Accept',
    origin: [
      'http://127.0.0.1',
      'http://localhost',
      'http://localhost:3000',
      'https://extensionly-api-gateway.vercel.app/',
    ],
    methods: 'GET, PUT, POST, DELETE, PATCH',
    credentials: true,
  });
  await app.listen(3000);
  module.exports = app;
}
bootstrap();
