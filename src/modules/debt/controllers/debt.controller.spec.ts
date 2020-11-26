import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'modules/auth/services';
import { DebtController } from 'modules/debt/controllers';
import { DebtService } from 'modules/debt/services';
import {
  debtCreateDto,
  debtUpdateDto,
  debt,
  paginatedDebts,
} from 'modules/debt/mocks';
import { createEmptyPaginatedResultMock } from 'common/mocks';
import { Debt } from 'modules/debt/schemas';
import { NotFoundException } from '@nestjs/common';

describe('DebtController', () => {
  let controller: DebtController;
  let service: DebtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtController],
      providers: [
        {
          provide: DebtService,
          useValue: {
            createDebt: jest.fn(),
            getPaginatedDebts: jest.fn(),
            getDebt: jest.fn(),
            updateDebt: jest.fn(),
            deleteDebt: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DebtController>(DebtController);
    service = module.get<DebtService>(DebtService);
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

  describe('createDebt', () => {
    it('should return created debt', async () => {
      const createDebtSpy = jest
        .spyOn(service, 'createDebt')
        .mockResolvedValue(debt);
      const response = await controller.createDebt(debtCreateDto);
      expect(response).toStrictEqual(debt);
      expect(createDebtSpy).toHaveBeenCalledTimes(1);
      expect(createDebtSpy).toHaveBeenCalledWith(debtCreateDto);
    });
  });

  describe('getDebts', () => {
    it('should return paginated debts', async () => {
      const getPaginatedDebtsSpy = jest
        .spyOn(service, 'getPaginatedDebts')
        .mockResolvedValue(paginatedDebts);
      const response = await controller.getDebts();
      expect(response).toStrictEqual(paginatedDebts);
      expect(getPaginatedDebtsSpy).toBeCalledTimes(1);
    });
    it('should return empty docs array if users collection is empty', async () => {
      const emptyPaginatedResult = createEmptyPaginatedResultMock<Debt>();
      jest
        .spyOn(service, 'getPaginatedDebts')
        .mockResolvedValue(emptyPaginatedResult);
      const response = await controller.getDebts();
      expect(response).toStrictEqual(emptyPaginatedResult);
    });
  });

  describe('getDebt', () => {
    it('should return one debt', async () => {
      const debtMock = debt;
      const { _id: id } = debtMock;
      const getDebtSpy = jest
        .spyOn(service, 'getDebt')
        .mockResolvedValueOnce(debtMock);
      const response = await controller.getDebt(id);
      expect(response).toStrictEqual(debtMock);
      expect(getDebtSpy).toHaveBeenCalledTimes(1);
      expect(getDebtSpy).toHaveBeenCalledWith(id, {});
    });
    it('should throw NotFoundException when debt not found', async () => {
      const id = 'some unknown id';
      jest.spyOn(service, 'getDebt').mockResolvedValueOnce(null);
      expect(controller.getDebt(id)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('updateDebt', () => {
    it('should return one updated debt', async () => {
      const debtMock = debt;
      const { _id: id } = debtMock;
      debtMock.amount = 20;
      const updateDebtSpy = jest
        .spyOn(service, 'updateDebt')
        .mockResolvedValueOnce(debtMock);
      const response = await controller.updateDebt(id, {
        amount: 20,
      });
      expect(response).toStrictEqual(debtMock);
      expect(updateDebtSpy).toHaveBeenCalledTimes(1);
    });
    it('should throw NotFoundException when debt not found', async () => {
      const id = 'some unknown id';
      jest.spyOn(service, 'updateDebt').mockResolvedValueOnce(null);
      expect(controller.updateDebt(id, debtUpdateDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('deleteDebt', () => {
    it('should return undefined when debt deleted successfully', async () => {
      const debtMock = debt;
      const { _id: id } = debtMock;
      const deleteDebtSpy = jest
        .spyOn(service, 'deleteDebt')
        .mockResolvedValueOnce(debtMock);
      const response = await controller.deleteDebt(id);
      expect(response).toBeUndefined();
      expect(deleteDebtSpy).toHaveBeenCalledWith(id);
      expect(deleteDebtSpy).toHaveReturnedWith<Debt>(debtMock);
    });
    it('should throw NotFoundException when debt not found', async () => {
      const id = 'some unknown id';
      jest.spyOn(service, 'deleteDebt').mockResolvedValueOnce(null);
      expect(controller.deleteDebt(id)).rejects.toThrowError(NotFoundException);
    });
  });
});
