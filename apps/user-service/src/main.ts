import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['193.123.106.255:9092'],
        },
        consumer: {
          groupId: 'user-consumer',
        },
      },
    },
  );
  app.listen();
  module.exports = app;
}
bootstrap();
