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
import {
  usersForRegistration,
  usersForLogin,
  userForUpdate,
} from './mocks/user.mock';
import { UserDto } from 'modules/user/dtos';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let authCookies: string;
  let loggedUser: UserDto;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule({
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }),
        UserModule,
        AuthModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();

    for (const i in usersForRegistration) {
      const userForRegistration = usersForRegistration[i];
      await request(server).post('/auth/register').send(userForRegistration);
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

  describe('/users (GET)', () => {
    it('should return array of users in docs property', async () => {
      const res = await request(server)
        .get('/users')
        .set('Cookie', [authCookies]);
      expect(res.status).toBe(200);
      expect(res.body.docs).toHaveLength(3);
    });
    it('should not return passwordHash in any of users', async () => {
      const res = await request(server)
        .get('/users')
        .set('Cookie', [authCookies]);
      expect(res.body.docs.every(({ passwordHash }) => !passwordHash));
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return user', async () => {
      const res = await request(server)
        .get(`/users/${loggedUser._id}`)
        .set('Cookie', [authCookies]);
      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject<UserDto>(loggedUser);
    });
    it('should return 404 when user not found', async () => {
      const res = await request(server)
        .get(`/users/5fb6bfb3af265e00204e078a`)
        .set('Cookie', [authCookies]);
      expect(res.status).toEqual(404);
      expect(res.body).toStrictEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
    it('should not return passwordHash property', async () => {
      const res = await request(server)
        .get(`/users/${loggedUser._id}`)
        .set('Cookie', [authCookies]);
      expect(res.status).toEqual(200);
      expect(res.body.passwordHash).toBeUndefined();
    });
  });

  describe('/users/:id (PATCH)', () => {
    it('should return updated user', async () => {
      const res = await request(server)
        .patch(`/users/${loggedUser._id}`)
        .set('Cookie', [authCookies])
        .send(userForUpdate);
      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject(userForUpdate);
    });
    it('should return 404 when user not found', async () => {
      const res = await request(server)
        .patch(`/users/5fb6bfb3af265e00204e078a`)
        .set('Cookie', [authCookies]);
      expect(res.status).toEqual(404);
      expect(res.body).toStrictEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
    it('should not return passwordHash property', async () => {
      const res = await request(server)
        .patch(`/users/${loggedUser._id}`)
        .set('Cookie', [authCookies]);
      expect(res.status).toEqual(200);
      expect(res.body.passwordHash).toBeUndefined();
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should return 204 status and empty body', async () => {
      const res = await request(server)
        .delete(`/users/${loggedUser._id}`)
        .set('Cookie', [authCookies]);
      expect(res.status).toStrictEqual(204);
      expect(res.body).toStrictEqual({});
    });
    it('should return 404 when user not found', async () => {
      const res = await request(server)
        .delete(`/users/5fb6bfb3af265e00204e078a`)
        .set('Cookie', [authCookies]);
      expect(res.status).toStrictEqual(404);
      expect(res.body).toStrictEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });
});
