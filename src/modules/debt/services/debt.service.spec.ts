import { Test, TestingModule } from '@nestjs/testing';
import { DebtRepository } from 'modules/debt/repositories';
import { DebtService } from 'modules/debt/services';
import { debtCreateDto, debt } from 'modules/debt/mocks';

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
    it('should return created user', async () => {
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
});
