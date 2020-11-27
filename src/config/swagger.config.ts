import { DocumentBuilder } from '@nestjs/swagger';

export const options = new DocumentBuilder()
  .setTitle('debt-exchange')
  .setDescription('description')
  .setVersion('0.0')
  .addCookieAuth('access_token')
  .build();
