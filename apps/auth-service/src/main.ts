import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['193.123.106.255:9092'],
        },
        consumer: {
          groupId: 'auth-consumer',
        },
      },
    },
  );
  app.listen();
}
bootstrap();
