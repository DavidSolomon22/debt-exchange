/* eslint-disable @typescript-eslint/no-var-requires */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'utils/testing-utils';
import { UserModule } from 'modules/user';
import { AuthModule } from 'modules/auth';
import { UtilsService } from 'utils/services';
import { usersForLogin, usersForCreation } from './mocks/user.mock';
import { UserDto } from 'modules/user/dtos';
import { UserRepository } from 'modules/user/repositories';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerConfigService } from 'config';
import { EmailTokenModule } from 'modules/email-token';

describe('EmailTokenController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let authCookies: string;
  let loggedUser: UserDto;

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
        UserModule,
        EmailTokenModule,
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

    const userRepository = app.get(UserRepository);
    for (const i in usersForCreation) {
      const userForCreation = usersForCreation[i];
      await userRepository.createUser(userForCreation);
    }
    const loginResponse = await request(server)
      .post('/auth/login')
      .send(usersForLogin[1]);
    loggedUser = loginResponse.body;
    authCookies = UtilsService.extractCookiesFromHeaders(loginResponse.headers);
  });

  afterEach(async () => {
    await closeInMongodConnection();
    await app.close();
  });

  describe('/email-tokens/:hash/email-verify (GET)', () => {
    it('TODO', async () => {});
  });

  describe('/email-tokens/:hash/password-reset (GET)', () => {
    it('TODO', async () => {});
  });
});
