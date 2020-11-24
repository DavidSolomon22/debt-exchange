import { Test, TestingModule } from '@nestjs/testing';
import { PaginateResult } from 'mongoose';
import { UserService } from '.';
import { UserRepository } from 'modules/user/repositories';
import { UserCreateDto, UserUpdateDto } from 'modules/user/dtos';
import { createMock } from '@golevelup/ts-jest';
import { User } from '../schemas';

const mockedPaginatedUsers: PaginateResult<any> = {
  docs: [
    {
      _id: 'some id',
      email: 'olivier.giroud@gmail.com',
      firstName: 'Olivier',
      surname: 'Giroud',
      __v: 0,
    },
    {
      _id: 'some id 2',
      email: 'eden.hazard@gmail.com',
      firstName: 'Eden',
      surname: 'Hazard',
      __v: 0,
    },
    {
      _id: 'some id 3',
      email: 'didier.drogba@gmail.com',
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

const mockedUserWithoutId = {
  email: 'olivier.giroud@gmail.com',
  firstName: 'Olivier',
  surname: 'Giroud',
  __v: 0,
};

const mockedUserWithPasswordHash = {
  email: 'olivier.giroud@gmail.com',
  firstName: 'Olivier',
  surname: 'Giroud',
  passwordHash: '$2b$10$8MtfEtB/tRLHXuzs.hoUaOJZmXRBw/2dyv3Z/rnfxrRqEs5g5U1JG',
  __v: 0,
};

const mockedUserCreateDto: UserCreateDto = {
  email: 'olivier.giroud@gmail.com',
  firstName: 'Olivier',
  surname: 'Giroud',
  passwordHash: '$2b$10$8MtfEtB/tRLHXuzs.hoUaOJZmXRBw/2dyv3Z/rnfxrRqEs5g5U1JG',
};

const userUpdateDto: UserUpdateDto = {
  email: 'olivier.giroud@gmail.com',
  firstName: 'Olivier',
  surname: 'Giroud',
};

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn().mockImplementation((user: UserCreateDto) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { passwordHash, ...userWithoutHash } = user;
              return Promise.resolve({
                _id: '5fb6bfb3af265e00204e078a',
                ...userWithoutHash,
              });
            }),
            getPaginatedUsers: jest
              .fn()
              .mockResolvedValue(mockedPaginatedUsers),
            getUser: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                _id: id,
                ...mockedUserWithoutId,
              }),
            ),
            updateUser: jest
              .fn()
              .mockImplementation((id: string, user: UserUpdateDto) =>
                Promise.resolve({
                  _id: id,
                  ...user,
                }),
              ),
            deleteUser: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                _id: id,
                ...mockedUserWithoutId,
              }),
            ),
            getOneByEmailWithHash: jest
              .fn()
              .mockImplementation((email: string) =>
                Promise.resolve({
                  ...mockedUserWithPasswordHash,
                  email,
                }),
              ),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create User', async () => {
      const userMock = createMock<User>({
        email: 'some id',
        firstName: 'Olivier',
        surname: 'Giroud',
      });
      userMock._id = 'some id';
      const createUserSpy = jest
        .spyOn(repository, 'createUser')
        .mockResolvedValueOnce(userMock);
      const response = await service.createUser(mockedUserCreateDto);
      expect(response).toBe(userMock);
      expect(createUserSpy).toBeCalledWith(mockedUserCreateDto);
    });
  });

  describe('getPaginatedUsers', () => {
    it('should return array of users', async () => {
      expect(service.getPaginatedUsers()).resolves.toEqual(
        mockedPaginatedUsers,
      );
    });
  });

  describe('getUser', () => {
    it('should return one user', async () => {
      const userMock = createMock<User>({
        email: 'some email',
        firstName: 'Olivier',
        surname: 'Giroud',
      });
      userMock._id = 'some id';
      const getUserSpy = jest
        .spyOn(repository, 'getUser')
        .mockResolvedValueOnce(userMock);
      const response = await service.getUser('some id');
      expect(response).toBe(userMock);
      expect(getUserSpy).toBeCalledWith('some id', {});
    });
  });

  describe('updateUser', () => {
    it('should update one user', async () => {
      expect(service.updateUser('some id', userUpdateDto)).resolves.toEqual({
        _id: 'some id',
        ...userUpdateDto,
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete one user', async () => {
      expect(service.deleteUser('some id')).resolves.toEqual({
        _id: 'some id',
        ...mockedUserWithoutId,
      });
    });
  });

  describe('getOneByEmailWithHash', () => {
    it('should return user with passwordHash', async () => {
      const userMock = createMock<User>({
        email: 'some email',
        firstName: 'Olivier',
        surname: 'Giroud',
        passwordHash: 'some passwordHash',
      });
      userMock._id = 'some id';
      const getOneByEmailWithHashSpy = jest
        .spyOn(repository, 'getOneByEmailWithHash')
        .mockResolvedValueOnce(userMock);
      const response = await service.getOneByEmailWithHash('some email');
      expect(response).toBe(userMock);
      expect(getOneByEmailWithHashSpy).toBeCalledWith('some email');
      expect(getOneByEmailWithHashSpy).toBeCalledTimes(1);
    });
  });
});
