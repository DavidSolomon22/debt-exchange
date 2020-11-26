import { createMock } from '@golevelup/ts-jest';
import { Country, CurrencyCode, LegalStatus } from 'common/constants';
import { DebtCreateDto } from 'modules/debt/dtos';
import { Debt } from 'modules/debt/schemas';
import { Types } from 'mongoose';
import { PaginateResult } from 'mongoose';

export const debt = createMock<Debt>({
  _id: new Types.ObjectId() as any,
  amount: 10,
  currencyCode: CurrencyCode.PLN,
  debtor: {
    legalStatus: LegalStatus.NATURAL_PERSON,
    country: Country.PL,
  },
  dueDate: new Date(),
  owner: new Types.ObjectId('5fa10b96ffae5a394a8c6b21'),
});

export const debtCreateDto: DebtCreateDto = {
  amount: 10,
  currencyCode: CurrencyCode.PLN,
  debtor: {
    legalStatus: LegalStatus.NATURAL_PERSON,
    country: Country.PL,
  },
  dueDate: new Date(),
  owner: '5fa10b96ffae5a394a8c6b21',
};

export const paginatedDebts = createMock<PaginateResult<Debt>>({
  docs: [
    {
      _id: new Types.ObjectId() as any,
      amount: 10,
      currencyCode: CurrencyCode.PLN,
      debtor: {
        legalStatus: LegalStatus.NATURAL_PERSON,
        country: Country.PL,
      },
      dueDate: new Date('2020-10-10'),
      owner: new Types.ObjectId('5fa10b96ffae5a394a8c6b21'),
    },
    {
      _id: new Types.ObjectId() as any,
      amount: 20,
      currencyCode: CurrencyCode.EUR,
      debtor: {
        legalStatus: LegalStatus.ORGANIZATION,
        country: Country.DE,
      },
      dueDate: new Date('2020-11-10'),
      owner: new Types.ObjectId('5fbe7a331f881d0091cbbdee'),
    },
    {
      _id: new Types.ObjectId() as any,
      amount: 30,
      currencyCode: CurrencyCode.USD,
      debtor: {
        legalStatus: LegalStatus.NATURAL_PERSON,
        country: Country.US,
      },
      dueDate: new Date('2020-12-10'),
      owner: new Types.ObjectId('5fbe7bacaf793200be87d277'),
    },
  ],
  hasNextPage: false,
  hasPrevPage: false,
  limit: 20,
  pagingCounter: 1,
  totalDocs: 3,
  totalPages: 1,
});
