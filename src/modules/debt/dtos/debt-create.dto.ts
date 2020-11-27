import { Type } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CurrencyCode } from 'common/constants';

class DebtorCreateDto {
  naturalPerson?: NaturalPersonCreateDto;
  organization?: OrganizationCreateDto;
  addresses?: AddressCreateDto;
  contacts?: ContactCreateDto;
  assets?: AssetCreateDto;
  bankAccounts?: BankAccountCreateDto;

  @IsNotEmpty()
  legalStatus: string;

  @IsNotEmpty()
  country: string;
  SAPBusinessPartnerId?: string;
}

class InterestCreateDto {
  dateFrom: Date;
  dateTo: Date;
  interestRatePerPeriod: string;
  period: string;
  periodAmount: string;
  interestPrincipal: string;
  amount: string;
}

class NaturalPersonCreateDto {
  firstName?: string;
  secondName?: string;
  surname?: string;
  documentType?: string;
  documentNumber?: string;
  taxNumber?: string;
}

class OrganizationCreateDto {
  businessNumber?: string;
  businessRegistry?: string;
  taxNumber?: string;
  name?: string;
}

class AddressCreateDto {
  street?: string;
  houseNumber?: string;
  apartmentNumber?: string;
  postalCode?: string;
  country?: string;
  voivodeship?: string;
  commune?: string;
  city?: string;
  district?: string;
}

class ContactCreateDto {
  description?: string;
  phone?: string;
  email?: string;
  fax?: string;
}

class AssetCreateDto {
  description?: string;
  value?: string;
  currency?: string;
  name?: string;
}

class BankAccountCreateDto {
  IBAN?: string;
  number?: string;
}

export class DebtCreateDto {
  @IsNotEmpty()
  @IsMongoId()
  debtOwner: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DebtorCreateDto)
  debtor: DebtorCreateDto;

  @IsOptional()
  interests?: InterestCreateDto[];

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsEnum(CurrencyCode)
  currencyCode: string;

  @IsNotEmpty()
  dueDate: Date;

  @IsOptional()
  amountWithInterest?: number;

  @IsOptional()
  contractNumber?: number;

  @IsOptional()
  documents?: string[];

  @IsOptional()
  evidenceText?: number;
}
