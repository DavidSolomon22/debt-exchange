import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MongoExceptionFilter,
  MongooseExceptionFilter,
  JwtExceptionFilter,
} from './filters';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new MongoExceptionFilter(),
    new MongooseExceptionFilter(),
    new JwtExceptionFilter(),
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
