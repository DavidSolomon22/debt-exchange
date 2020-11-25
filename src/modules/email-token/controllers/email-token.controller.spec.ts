import { Test, TestingModule } from '@nestjs/testing';
import { EmailTokenController } from '.';
import { AuthService } from 'modules/auth/services';
import { NotFoundException } from '@nestjs/common';
import { EmailTokenService } from '../services';

describe('EmailTokenController', () => {
  let controller: EmailTokenController;
  let service: EmailTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailTokenController],
      providers: [
        {
          provide: EmailTokenService,
          useValue: {
            confirmUser: jest.fn(),
            resetPassword: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<EmailTokenController>(EmailTokenController);
    service = module.get<EmailTokenService>(EmailTokenService);
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

  describe('confirmUserThroughEmailToken', () => {
    it('should return true when user was confirmed', async () => {
      const hash = 'some hash';
      const email = 'some email';
      const confirmUserSpy = jest
        .spyOn(service, 'confirmUser')
        .mockResolvedValue(true);
      const response = await controller.confirmUserThroughEmailToken(
        hash,
        email,
      );
      expect(response).toBe<boolean>(true);
      expect(confirmUserSpy).toHaveBeenCalledTimes(1);
      expect(confirmUserSpy).toHaveBeenCalledWith(hash, email);
    });
    it('should throw NotFoundException when user was not confirmed', async () => {
      const hash = 'some hash';
      const email = 'some email';
      const confirmUserSpy = jest
        .spyOn(service, 'confirmUser')
        .mockResolvedValue(false);
      expect(
        controller.confirmUserThroughEmailToken(hash, email),
      ).rejects.toThrowError(NotFoundException);
      expect(confirmUserSpy).toHaveBeenCalledTimes(1);
      expect(confirmUserSpy).toHaveBeenCalledWith(hash, email);
    });
  });

  describe('resetPasswordThroughEmailToken', () => {
    it('should return true when password was reseted', async () => {
      const hash = 'some hash';
      const email = 'some email';
      const resetPasswordSpy = jest
        .spyOn(service, 'resetPassword')
        .mockResolvedValue(true);
      const response = await controller.resetPasswordThroughEmailToken(
        hash,
        email,
      );
      expect(response).toBe<boolean>(true);
      expect(resetPasswordSpy).toHaveBeenCalledTimes(1);
      expect(resetPasswordSpy).toHaveBeenCalledWith(hash, email);
    });
    it('should throw NotFoundException when password was not reseted', async () => {
      const hash = 'some hash';
      const email = 'some email';
      const resetPasswordSpy = jest
        .spyOn(service, 'resetPassword')
        .mockResolvedValue(false);
      expect(
        controller.resetPasswordThroughEmailToken(hash, email),
      ).rejects.toThrowError(NotFoundException);
      expect(resetPasswordSpy).toHaveBeenCalledTimes(1);
      expect(resetPasswordSpy).toHaveBeenCalledWith(hash, email);
    });
  });
});
