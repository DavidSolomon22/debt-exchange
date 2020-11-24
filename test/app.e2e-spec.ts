import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'utils/testing-utils';
import { AuthModule } from 'modules/auth';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerConfigService } from 'config';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        rootMongooseTestModule({
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }),
        AuthModule,
        MailerModule.forRootAsync({
          imports: [ConfigModule],
          useClass: MailerConfigService,
          inject: [ConfigService],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterEach(async () => {
    await closeInMongodConnection();
    await app.close();
  });

  it('/auth (GET)', async () => {
    return request(server).get('/auth').expect(200).expect('test');
  });
});
