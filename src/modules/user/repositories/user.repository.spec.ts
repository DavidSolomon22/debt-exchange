import { Test, TestingModule } from '@nestjs/testing';
import { PaginateModel, PaginateResult } from 'mongoose';
import { UserRepository } from './user.repository';
import { User } from '../schemas';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/ts-jest';
import { DocumentQuery } from 'mongoose';

describe('UserRepository', () => {
  let repository: UserRepository;
  let model: PaginateModel<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken('User'),
          useValue: {
            paginate: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            select: jest.fn(),
            populate: jest.fn(),
            lean: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    model = module.get<PaginateModel<User>>(getModelToken('User'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('model should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create User', async () => {
      const mockedUser: any = {
        _id: 'some id',
        email: 'oli@gmail.com',
        firstName: 'Olivier',
        surname: 'Giroud',
        __v: 0,
      };
      jest.spyOn(model, 'create').mockResolvedValueOnce(mockedUser);

      const createdUser = await repository.createUser({
        email: 'oli@gmail.com',
        passwordHash: 'somePasswordHash',
        firstName: 'Olivier',
        surname: 'Giroud',
      });

      expect(createdUser).toStrictEqual(mockedUser as User);
      expect(createdUser.passwordHash).toBeUndefined();
    });
  });

  describe('getPaginatedUsers', () => {
    it('should return array of users', async () => {
      const mockedPaginatedUsers: PaginateResult<any> = {
        docs: [
          {
            _id: 'some id',
            email: 'oli@gmail.com',
            firstName: 'Olivier',
            surname: 'Giroud',
            __v: 0,
          },
          {
            _id: 'some id 2',
            email: 'eden@gmail.com',
            firstName: 'Eden',
            surname: 'Hazard',
            __v: 0,
          },
          {
            _id: 'some id 3',
            email: 'drogba@gmail.com',
            firstName: 'Didier',
            surname: 'Drogba',
            __v: 0,
          },
        ],
        hasNextPage: false,
        hasPrevPage: false,
        limit: 20,
        pagingCounter: 1,
        totalDocs: 3,
        totalPages: 1,
      };

      jest.spyOn(model, 'paginate').mockResolvedValueOnce(mockedPaginatedUsers);

      const paginatedUsers = await repository.getPaginatedUsers();
      expect(paginatedUsers.docs).toBeDefined();
      expect(paginatedUsers.docs).toHaveLength(3);
      expect(paginatedUsers).toStrictEqual(mockedPaginatedUsers);
    });
  });

  describe('getUser', () => {
    it('should return one user', async () => {
      const mockedUser: any = {
        _id: 'some id',
        email: 'oli@gmail.com',
        firstName: 'Olivier',
        surname: 'Giroud',
        __v: 0,
      };
      jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<DocumentQuery<User, User, unknown>>({
          select: () => ({
            populate: () => ({
              lean: jest.fn().mockResolvedValueOnce(mockedUser),
            }),
          }),
        }),
      );
      const user = await repository.getUser('some id');
      expect(user).toStrictEqual(mockedUser as User);
    });
  });

  describe('updateUser', () => {
    it('should update one user', async () => {
      const mockedUser: any = {
        _id: 'some id',
        email: 'oli@gmail.com',
        firstName: 'Olivier-Changed',
        surname: 'Giroud',
        __v: 0,
      };
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce(
        createMock<DocumentQuery<User, User, unknown>>({
          select: () => ({
            populate: () => ({
              lean: jest.fn().mockResolvedValueOnce(mockedUser),
            }),
          }),
        }),
      );
      const updatedUser = await repository.updateUser('some id', {
        email: 'oli@gmail.com',
        firstName: 'Olivier-Changed',
        surname: 'Giroud',
      });
      expect(updatedUser).toStrictEqual(mockedUser as User);
    });
  });

  describe('deleteUser', () => {
    it('should delete one user', async () => {
      const mockedDeleteResponse: any = {
        _id: 'some id',
        email: 'oli@gmail.com',
        firstName: 'Olivier',
        surname: 'Giroud',
        __v: 0,
      };
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockReturnValueOnce(mockedDeleteResponse as any);
      const deletedUser = await repository.deleteUser('some id');
      expect(deletedUser).toStrictEqual(mockedDeleteResponse);
    });
  });

  describe('getOneByEmailWithHash', () => {
    it('should get user with passwordHash', async () => {
      const mockedUser: any = {
        _id: 'some id',
        email: 'oli@gmail.com',
        firstName: 'Olivier',
        surname: 'Giroud',
        passwordHash: 'some passwordHash',
      };
      jest.spyOn(model, 'findOne').mockReturnValueOnce(
        createMock<DocumentQuery<User, User, unknown>>({
          select: () => ({
            lean: () => ({
              exec: jest.fn().mockResolvedValueOnce(mockedUser),
            }),
          }),
        }),
      );
      const user = await repository.getOneByEmailWithHash('oli@gmail.com');
      expect(user.passwordHash).toBeDefined();
      expect(user).toStrictEqual(mockedUser);
    });
  });
});
