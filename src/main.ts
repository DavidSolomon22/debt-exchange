import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'modules/app';
import {
  JwtExceptionFilter,
  MongoExceptionFilter,
  MongooseExceptionFilter,
} from 'filters';
import { validationPipeConfig } from 'config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'log', 'verbose', 'warn'],
  });
  app.useGlobalFilters(
    new MongoExceptionFilter(),
    new MongooseExceptionFilter(),
    new JwtExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector, {
      strategy: 'excludeAll',
      enableImplicitConversion: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
