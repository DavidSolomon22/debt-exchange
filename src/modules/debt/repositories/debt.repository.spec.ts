import { Test, TestingModule } from '@nestjs/testing';
import { PaginateModel } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/ts-jest';
import { DebtRepository } from 'modules/debt/repositories';
import { Debt } from 'modules/debt/schemas';

describe('DebtRepository', () => {
  let repository: DebtRepository;
  let model: PaginateModel<Debt>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebtRepository,
        {
          provide: getModelToken('Debt'),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<DebtRepository>(DebtRepository);
    model = module.get<PaginateModel<Debt>>(getModelToken('Debt'));
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

  describe('createDebt', () => {
    it('', async () => {});
    it('', async () => {});
  });

  describe('getPaginatedDebts', () => {
    it('', async () => {});
    it('', async () => {});
  });

  describe('getDebt', () => {
    it('', async () => {});
    it('', async () => {});
  });

  describe('updateDebt', () => {
    it('', async () => {});
    it('', async () => {});
  });

  describe('deleteDebt', () => {
    it('', async () => {});
    it('', async () => {});
  });

  // describe('createEmailToken', () => {
  //   it('should return created email token', async () => {
  //     const createdEmailToken = createMock<EmailToken>({
  //       ...emailTokenCreateDto,
  //     });
  //     createdEmailToken._id = 'some id';
  //     const createSpy = jest
  //       .spyOn(model, 'create')
  //       .mockResolvedValueOnce(createdEmailToken);
  //     const response = await repository.createEmailToken(emailTokenCreateDto);
  //     expect(response).toStrictEqual(createdEmailToken);
  //     expect(createSpy).toHaveBeenCalledTimes(1);
  //     expect(createSpy).toHaveBeenCalledWith(emailTokenCreateDto);
  //   });
  // });
});
