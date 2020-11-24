import { Test, TestingModule } from '@nestjs/testing';
import { EmailTokenService } from '.';
import { EmailTokenRepository } from 'modules/email-token/repositories';
import { UserService } from 'modules/user/services';
import { EmailTokenCreateDto } from '../dtos';
import { emailToken } from '../mocks';

describe('UserService', () => {
  let service: EmailTokenService;
  let repository: EmailTokenRepository;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailTokenService,
        {
          provide: EmailTokenRepository,
          useValue: {
            createEmailToken: jest.fn(),
            getByIdAndEmail: jest.fn(),
            deleteToken: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            resetPassword: jest.fn(),
            confirmEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailTokenService>(EmailTokenService);
    repository = module.get<EmailTokenRepository>(EmailTokenRepository);
    userService = module.get<UserService>(UserService);
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

  it('user service should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createEmailToken', () => {
    it('should return created email token', async () => {
      emailToken._id = 'some id';
      const { email } = emailToken;
      const createEmailTokenSpy = jest
        .spyOn(repository, 'createEmailToken')
        .mockResolvedValue(emailToken);
      const response = await service.createEmailToken(email);
      expect(response.email).toBe<string>(email);
      expect(createEmailTokenSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('confirmUser', () => {
    it('should return true when user was confirmed', async () => {
      emailToken._id = 'some id';
      const { _id: id, email } = emailToken;
      const getByIdAndEmailSpy = jest
        .spyOn(repository, 'getByIdAndEmail')
        .mockResolvedValueOnce(emailToken);
      const confirmEmailSpy = jest.spyOn(userService, 'confirmEmail');
      const deleteTokenSpy = jest.spyOn(repository, 'deleteToken');
      const response = await service.confirmUser(id, email);
      expect(response).toBe<boolean>(true);
      expect(getByIdAndEmailSpy).toHaveBeenCalledTimes(1);
      expect(getByIdAndEmailSpy).toHaveBeenCalledWith(id, email);
      expect(confirmEmailSpy).toHaveBeenCalledTimes(1);
      expect(confirmEmailSpy).toHaveBeenCalledWith(email);
      expect(deleteTokenSpy).toHaveBeenCalledTimes(1);
      expect(deleteTokenSpy).toHaveBeenCalledWith(id);
    });
    it('should return false when email token was not found', async () => {
      emailToken._id = 'some unknown id';
      const { _id: id, email } = emailToken;
      const getByIdAndEmailSpy = jest
        .spyOn(repository, 'getByIdAndEmail')
        .mockResolvedValueOnce(null);
      const resetPasswordSpy = jest.spyOn(userService, 'confirmEmail');
      const deleteTokenSpy = jest.spyOn(repository, 'deleteToken');
      const response = await service.resetPassword(id, email);
      expect(response).toBe<boolean>(false);
      expect(getByIdAndEmailSpy).toHaveBeenCalledTimes(1);
      expect(getByIdAndEmailSpy).toHaveBeenCalledWith(id, email);
      expect(resetPasswordSpy).not.toHaveBeenCalled();
      expect(deleteTokenSpy).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('should return true when password was reseted', async () => {
      emailToken._id = 'some id';
      const { _id: id, email } = emailToken;
      const getByIdAndEmailSpy = jest
        .spyOn(repository, 'getByIdAndEmail')
        .mockResolvedValueOnce(emailToken);
      const resetPasswordSpy = jest.spyOn(userService, 'resetPassword');
      const deleteTokenSpy = jest.spyOn(repository, 'deleteToken');
      const response = await service.resetPassword(id, email);
      expect(response).toBe<boolean>(true);
      expect(getByIdAndEmailSpy).toHaveBeenCalledTimes(1);
      expect(getByIdAndEmailSpy).toHaveBeenCalledWith(id, email);
      expect(resetPasswordSpy).toHaveBeenCalledTimes(1);
      expect(resetPasswordSpy).toHaveBeenCalledWith(email);
      expect(deleteTokenSpy).toHaveBeenCalledTimes(1);
      expect(deleteTokenSpy).toHaveBeenCalledWith(id);
    });
    it('should return false when email token was not found', async () => {
      emailToken._id = 'some unknown id';
      const { _id: id, email } = emailToken;
      const getByIdAndEmailSpy = jest
        .spyOn(repository, 'getByIdAndEmail')
        .mockResolvedValueOnce(null);
      const resetPasswordSpy = jest.spyOn(userService, 'resetPassword');
      const deleteTokenSpy = jest.spyOn(repository, 'deleteToken');
      const response = await service.resetPassword(id, email);
      expect(response).toBe<boolean>(false);
      expect(getByIdAndEmailSpy).toHaveBeenCalledTimes(1);
      expect(getByIdAndEmailSpy).toHaveBeenCalledWith(id, email);
      expect(resetPasswordSpy).not.toHaveBeenCalled();
      expect(deleteTokenSpy).not.toHaveBeenCalled();
    });
  });

  describe('makeid', () => {
    it('should return string of length 10', () => {
      const response = service.makeid(10);
      expect(response).toHaveLength(10);
      expect(typeof response).toBe('string');
    });
    it('should return empty string if length param equals 0', () => {
      const response = service.makeid(0);
      expect(response).toStrictEqual('');
    });
    it('should return empty string if length param is less than 0', () => {
      const response = service.makeid(-1);
      expect(response).toStrictEqual('');
    });
  });

  describe('createTokenPayload', () => {
    it('should return EmailTokenCreateDto', () => {
      const email = 'some email';
      const response = service.createTokenPayload(email);
      expect(response.email).toStrictEqual(email);
      expect<EmailTokenCreateDto>(response);
    });
  });
});
