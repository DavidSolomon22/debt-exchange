import { Test, TestingModule } from '@nestjs/testing';
import { PaginateModel } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { DebtRepository } from 'modules/debt/repositories';
import { Debt } from 'modules/debt/schemas';
import { debtCreateDto, debt } from 'modules/debt/mocks';

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
    it('should return created user', async () => {
      const debtMock = debt;
      debtMock._id = '5fa10b96ffae5a394a8c6b21';
      const createDebtSpy = jest
        .spyOn(model, 'create')
        .mockResolvedValue(debtMock);
      const response = await repository.createDebt(debtCreateDto);
      expect(response).toStrictEqual(debtMock);
      expect(createDebtSpy).toHaveBeenCalledTimes(1);
      expect(createDebtSpy).toHaveBeenCalledWith(debtCreateDto);
    });
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
});
