import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Moralis from 'moralis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  await app.listen(8000);
}

Moralis.start({
  apiKey: 'yv2QT1y7W5ePG3KBqRrxTBgm8uUTowv8RRIctpmBdycaGmGi1bQxmD39W9TMJOzH',
}).then(() => bootstrap());
// bootstrap();
