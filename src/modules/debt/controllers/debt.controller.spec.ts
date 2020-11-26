import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'modules/auth/services';
import { DebtController } from 'modules/debt/controllers';
import { DebtService } from 'modules/debt/services';
import { debtCreateDto, debt, paginatedDebts } from 'modules/debt/mocks';
import { createEmptyPaginatedResultMock } from 'common/mocks';
import { Debt } from 'modules/debt/schemas';

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
      const debtMock = debt;
      debtMock._id = '5fa10b96ffae5a394a8c6b21';
      const createDebtSpy = jest
        .spyOn(service, 'createDebt')
        .mockResolvedValue(debtMock);
      const response = await controller.createDebt(debtCreateDto);
      expect(response).toStrictEqual(debtMock);
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

  describe('', () => {});
  describe('', () => {});
  describe('', () => {});
});
