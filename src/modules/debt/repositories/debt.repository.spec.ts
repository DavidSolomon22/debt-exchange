import { Test, TestingModule } from '@nestjs/testing';
import { PaginateModel } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { DebtRepository } from 'modules/debt/repositories';
import { Debt } from 'modules/debt/schemas';
import { debtCreateDto, debt, paginatedDebts } from 'modules/debt/mocks';
import { createEmptyPaginatedResultMock } from 'common/mocks';
import { createMock } from '@golevelup/ts-jest';
import { DocumentQuery } from 'mongoose';

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
            paginate: jest.fn(),
            findById: jest.fn(),
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
    it('should return paginated debts', async () => {
      const getPaginatedDebtsSpy = jest
        .spyOn(model, 'paginate')
        .mockResolvedValue(paginatedDebts);
      const response = await repository.getPaginatedDebts();
      expect(response).toStrictEqual(paginatedDebts);
      expect(getPaginatedDebtsSpy).toBeCalledTimes(1);
    });
    it('should return empty docs array if users collection is empty', async () => {
      const emptyPaginatedResult = createEmptyPaginatedResultMock<Debt>();
      jest.spyOn(model, 'paginate').mockResolvedValue(emptyPaginatedResult);
      const response = await repository.getPaginatedDebts();
      expect(response).toStrictEqual(emptyPaginatedResult);
    });
  });

  describe('getDebt', () => {
    it('should return one debt', async () => {
      const debtMock = debt;
      const { _id: id } = debtMock;
      const findByIdSpy = jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<DocumentQuery<Debt, Debt, unknown>>({
          select: () => ({
            populate: () => ({
              lean: jest.fn().mockResolvedValueOnce(debtMock),
            }),
          }),
        }),
      );
      const response = await repository.getDebt(id);
      expect(response).toStrictEqual(debtMock);
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith(id);
    });
    it('should return null when debt is not found', async () => {
      const id = 'some unknown id';
      const findByIdSpy = jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<DocumentQuery<Debt, Debt, unknown>>({
          select: () => ({
            populate: () => ({
              lean: jest.fn().mockResolvedValueOnce(null),
            }),
          }),
        }),
      );
      const response = await repository.getDebt(id);
      expect(response).toBeNull();
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith(id);
    });
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
