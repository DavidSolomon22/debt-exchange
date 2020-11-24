import { Test, TestingModule } from '@nestjs/testing';
import { PaginateModel } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/ts-jest';
import { EmailToken } from 'modules/email-token/schemas';
import { EmailTokenRepository } from './email-token.repository';
import { emailTokenCreateDto, emailToken } from 'modules/email-token/mocks';

describe('EmailTokenRepository', () => {
  let repository: EmailTokenRepository;
  let model: PaginateModel<EmailToken>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailTokenRepository,
        {
          provide: getModelToken('EmailToken'),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<EmailTokenRepository>(EmailTokenRepository);
    model = module.get<PaginateModel<EmailToken>>(getModelToken('EmailToken'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('model should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('createEmailToken', () => {
    it('should return created email token', async () => {
      const createdEmailToken = createMock<EmailToken>({
        ...emailTokenCreateDto,
      });
      createdEmailToken._id = 'some id';
      const createSpy = jest
        .spyOn(model, 'create')
        .mockResolvedValueOnce(createdEmailToken);
      const response = await repository.createEmailToken(emailTokenCreateDto);
      expect(response).toStrictEqual(createdEmailToken);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(emailTokenCreateDto);
    });
  });

  describe('getByIdAndEmail', () => {
    it('should return one email token', async () => {
      emailToken._id = 'some id';
      const findOneSpy = jest
        .spyOn(model, 'findOne')
        .mockResolvedValueOnce(emailToken);
      const { _id, email } = emailToken;
      const response = await repository.getByIdAndEmail(_id, email);
      expect(response).toStrictEqual(emailToken);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({ _id, email });
    });
    it('should return null when email token was not found', async () => {
      const id = 'some unknown id';
      const email = 'someemail@gmail.com';
      const findOneSpy = jest
        .spyOn(model, 'findOne')
        .mockResolvedValueOnce(null);
      const response = await repository.getByIdAndEmail(id, email);
      expect(response).toBeNull();
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenLastCalledWith({ _id: id, email });
    });
  });

  describe('deleteToken', () => {
    it('should return deleted email token', async () => {
      emailToken._id = 'some id';
      const findByIdAndDeleteSpy = jest
        .spyOn(model, 'findByIdAndDelete')
        .mockResolvedValueOnce(emailToken);
      const { _id } = emailToken;
      const response = await repository.deleteToken(_id);
      expect(response).toStrictEqual(emailToken);
      expect(findByIdAndDeleteSpy).toHaveBeenCalledTimes(1);
      expect(findByIdAndDeleteSpy).toHaveBeenCalledWith(_id);
    });
    it('should return null when email token was not found', async () => {
      const id = 'some unknown id';
      const findByIdAndDeleteSpy = jest
        .spyOn(model, 'findByIdAndDelete')
        .mockResolvedValueOnce(null);
      const response = await repository.deleteToken(id);
      expect(response).toBeNull();
      expect(findByIdAndDeleteSpy).toHaveBeenCalledTimes(1);
      expect(findByIdAndDeleteSpy).toHaveBeenCalledWith(id);
    });
  });
});
