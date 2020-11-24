import { Test, TestingModule } from '@nestjs/testing';
import { PaginateResult } from 'mongoose';
import { UserService } from 'modules/user/services';
import { UserRepository } from 'modules/user/repositories';
import { UserCreateDto, UserUpdateDto } from 'modules/user/dtos';
import { createMock } from '@golevelup/ts-jest';
import { User } from 'modules/user/schemas';
import { UserController } from '.';
import { AuthService } from 'modules/auth/services';
import { NotFoundException } from '@nestjs/common';

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

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getPaginatedUsers: jest.fn(),
            getUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return paginated users', async () => {
      jest
        .spyOn(service, 'getPaginatedUsers')
        .mockImplementationOnce(async () => mockedPaginatedUsers);
      const paginatedUsers = await controller.getUsers();
      expect(paginatedUsers).toStrictEqual(mockedPaginatedUsers);
      expect(service.getPaginatedUsers).toBeCalledWith({}, {});
      expect(service.getPaginatedUsers).toBeCalledTimes(1);
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
        .spyOn(service, 'getUser')
        .mockResolvedValueOnce(userMock);
      const response = await controller.getUser('some id');
      expect(response).toBe(userMock);
      expect(getUserSpy).toBeCalledWith('some id', {});
    });
    it('should throw NotFoundException when user not found', async () => {
      const id = 'some unknown id';
      jest.spyOn(service, 'getUser').mockResolvedValueOnce(null);
      expect(controller.getUser(id)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('updateUser', () => {
    it('should return one updated user', async () => {
      const userMock = createMock<UserUpdateDto>({
        firstName: 'Olivier',
        surname: 'Giroud',
      });
      const id = 'some id';
      jest.spyOn(service, 'updateUser').mockResolvedValueOnce({
        _id: id,
        ...userMock,
      } as User);
      const response = await controller.updateUser(id, userMock);
      expect(response).toStrictEqual({
        _id: id,
        ...userMock,
      });
    });
    it('should throw NotFoundException when user not found', async () => {
      const id = 'some unknown id';
      const userMock = createMock<UserUpdateDto>({
        firstName: 'Olivier',
        surname: 'Giroud',
      });
      jest.spyOn(service, 'updateUser').mockResolvedValueOnce(null);
      expect(controller.updateUser(id, userMock)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('deleteUser', () => {
    it('should return undefined', async () => {
      const userMock = createMock<User>({
        email: 'some email',
      });
      userMock._id = 'some id';
      const deleteUserSpy = jest
        .spyOn(service, 'deleteUser')
        .mockResolvedValueOnce(userMock);
      const response = await controller.deleteUser(userMock._id);
      expect(response).toBeUndefined();
      expect(deleteUserSpy).toHaveBeenCalledWith(userMock._id);
      expect(deleteUserSpy).toHaveReturnedWith<User>(userMock);
    });
    it('should throw NotFoundException when user not found', async () => {
      const id = 'some unknown id';
      jest.spyOn(service, 'deleteUser').mockResolvedValueOnce(null);
      expect(controller.deleteUser(id)).rejects.toThrowError(NotFoundException);
    });
  });
});
