import { Test, TestingModule } from '@nestjs/testing';
import { DebtRepository } from 'modules/debt/repositories';
import { DebtService } from 'modules/debt/services';
import {
  debtCreateDto,
  debt,
  paginatedDebts,
  debtUpdateDto,
} from 'modules/debt/mocks';
import { Debt } from 'modules/debt/schemas';
import { createEmptyPaginatedResultMock } from 'common/mocks';

describe('DebtService', () => {
  let service: DebtService;
  let repository: DebtRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebtService,
        {
          provide: DebtRepository,
          useValue: {
            createDebt: jest.fn(),
            getPaginatedDebts: jest.fn(),
            getDebt: jest.fn(),
            updateDebt: jest.fn(),
            deleteDebt: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DebtService>(DebtService);
    repository = module.get<DebtRepository>(DebtRepository);
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

  describe('createDebt', () => {
    it('should return created debt', async () => {
      const debtMock = debt;
      debtMock._id = '5fa10b96ffae5a394a8c6b21';
      const createDebtSpy = jest
        .spyOn(repository, 'createDebt')
        .mockResolvedValue(debtMock);
      const response = await service.createDebt(debtCreateDto);
      expect(response).toStrictEqual(debtMock);
      expect(createDebtSpy).toHaveBeenCalledTimes(1);
      expect(createDebtSpy).toHaveBeenCalledWith(debtCreateDto);
    });
  });

  describe('getPaginatedDebts', () => {
    it('should return paginated debts', async () => {
      const getPaginatedDebtsSpy = jest
        .spyOn(repository, 'getPaginatedDebts')
        .mockResolvedValue(paginatedDebts);
      const response = await service.getPaginatedDebts();
      expect(response).toStrictEqual(paginatedDebts);
      expect(getPaginatedDebtsSpy).toBeCalledTimes(1);
    });
    it('should return empty docs array if debts collection is empty', async () => {
      const emptyPaginatedResult = createEmptyPaginatedResultMock<Debt>();
      jest
        .spyOn(repository, 'getPaginatedDebts')
        .mockResolvedValue(emptyPaginatedResult);
      const response = await service.getPaginatedDebts();
      expect(response).toStrictEqual(emptyPaginatedResult);
    });
  });

  describe('getDebt', () => {
    it('should return one debt', async () => {
      const debtMock = debt;
      const { _id: id } = debtMock;
      const getDebtSpy = jest
        .spyOn(repository, 'getDebt')
        .mockResolvedValueOnce(debtMock);
      const response = await service.getDebt(id);
      expect(response).toStrictEqual(debtMock);
      expect(getDebtSpy).toHaveBeenCalledTimes(1);
      expect(getDebtSpy).toHaveBeenCalledWith(id, {});
    });
    it('should return null when debt is not found', async () => {
      const id = 'some unknown id';
      const getDebtSpy = jest
        .spyOn(repository, 'getDebt')
        .mockResolvedValueOnce(null);
      const response = await service.getDebt(id);
      expect(response).toBeNull();
      expect(getDebtSpy).toHaveBeenCalledTimes(1);
      expect(getDebtSpy).toHaveBeenCalledWith(id, {});
    });
  });

  describe('updateDebt', () => {
    it('should return one updated debt', async () => {
      const debtMock = debt;
      const { _id: id } = debtMock;
      debtMock.amount = 20;
      const updateDebtSpy = jest
        .spyOn(repository, 'updateDebt')
        .mockResolvedValueOnce(debtMock);
      const response = await service.updateDebt(id, {
        amount: 20,
      });
      expect(response).toStrictEqual(debtMock);
      expect(updateDebtSpy).toHaveBeenCalledTimes(1);
    });
    it('should return null when debt not found', async () => {
      const id = 'some unknown id';
      const updateDebtSpy = jest
        .spyOn(repository, 'updateDebt')
        .mockResolvedValueOnce(null);
      const response = await service.updateDebt(id, debtUpdateDto);
      expect(response).toBeNull();
      expect(updateDebtSpy).toHaveBeenCalledTimes(1);
      expect(updateDebtSpy).toHaveBeenCalledWith(id, debtUpdateDto, {});
    });
  });

  describe('deleteDebt', () => {
    it('should return deleted debt', async () => {
      const debtMock = debt;
      const { _id: id } = debtMock;
      const deleteDebtSpy = jest
        .spyOn(repository, 'deleteDebt')
        .mockResolvedValueOnce(debtMock);
      const response = await service.deleteDebt(id);
      expect(response).toStrictEqual(debtMock);
      expect(deleteDebtSpy).toHaveBeenCalledTimes(1);
      expect(deleteDebtSpy).toHaveBeenCalledWith(id);
    });
    it('should return null when debt was not found', async () => {
      const id = 'some unknown id';
      const deleteDebtSpy = jest
        .spyOn(repository, 'deleteDebt')
        .mockResolvedValueOnce(null);
      const response = await service.deleteDebt(id);
      expect(response).toBeNull();
      expect(deleteDebtSpy).toHaveBeenCalledTimes(1);
      expect(deleteDebtSpy).toHaveBeenCalledWith(id);
    });
  });
});
