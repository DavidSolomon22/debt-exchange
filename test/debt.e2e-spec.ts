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
import { DebtModule } from 'modules/debt';
import { debtCreateDto, debtsForCreation } from 'modules/debt/mocks';
import { DebtRepository } from 'modules/debt/repositories';
import { Debt } from 'modules/debt/schemas';

describe('DebtController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let authCookies: string;
  let loggedUser: UserDto;
  let debtCreated: Debt;

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
        MailerModule.forRootAsync({
          imports: [ConfigModule],
          useClass: MailerConfigService,
          inject: [ConfigService],
        }),
        AuthModule,
        DebtModule,
        UserModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();

    const userRepository = app.get(UserRepository);
    const debtRepository = app.get(DebtRepository);
    for (const i in usersForCreation) {
      const userForCreation = usersForCreation[i];
      await userRepository.createUser(userForCreation);
    }
    for (const i in debtsForCreation) {
      const debtForCreation = debtsForCreation[i];
      debtCreated = await debtRepository.createDebt(debtForCreation);
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

  describe('/debts (POST)', () => {
    it('should return 201 status code', async () => {
      const res = await request(server)
        .post('/debts')
        .set('Cookie', [authCookies])
        .send(debtCreateDto);
      expect(res.status).toBe(201);
      // expect(res.body).toStrictEqual({});
    });
    it('TODO: try to return json from post request', async () => {});
  });

  describe('/debts (GET)', () => {
    it('should return array of debts in docs property', async () => {
      const res = await request(server)
        .get('/debts')
        .set('Cookie', [authCookies]);
      expect(res.status).toBe(200);
      expect(res.body.docs).toHaveLength(3);
    });
  });

  describe('/debts/:id (GET)', () => {
    it('should return debt', async () => {
      const res = await request(server)
        .get(`/debts/${debtCreated._id}`)
        .set('Cookie', [authCookies]);
      expect(res.status).toEqual(200);
    });
    it('should return 404 when debt not found', async () => {
      const res = await request(server)
        .get(`/debts/5fb6bfb3af265e00204e078a`)
        .set('Cookie', [authCookies]);
      expect(res.status).toEqual(404);
      expect(res.body).toStrictEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });

  describe('/debts/:id (PATCH)', () => {
    it('should return updated debt', async () => {
      const res = await request(server)
        .patch(`/debts/${debtCreated._id}`)
        .set('Cookie', [authCookies])
        .send({
          amount: 10000,
        });
      expect(res.status).toEqual(200);
      expect(res.body.amount).toBe<number>(10000);
    });
    it('should return 404 when debt not found', async () => {
      const res = await request(server)
        .patch(`/debts/5fb6bfb3af265e00204e078a`)
        .set('Cookie', [authCookies]);
      expect(res.status).toEqual(404);
      expect(res.body).toStrictEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });

  describe('/debts/:id (DELETE)', () => {
    it('should return updated debt', async () => {
      const res = await request(server)
        .delete(`/debts/${debtCreated._id}`)
        .set('Cookie', [authCookies]);
      expect(res.status).toEqual(204);
      expect(res.body).toStrictEqual({});
    });
    it('should return 404 when debt not found', async () => {
      const res = await request(server)
        .delete(`/debts/5fb6bfb3af265e00204e078a`)
        .set('Cookie', [authCookies]);
      expect(res.status).toEqual(404);
      expect(res.body).toStrictEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });
});
