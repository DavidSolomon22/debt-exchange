import { Type } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CurrencyCode } from 'common/constants';

class NaturalPersonUpdateDto {
  @IsOptional()
  firstName?: string;
  @IsOptional()
  secondName?: string;
  @IsOptional()
  surname?: string;
  @IsOptional()
  documentType?: string;
  @IsOptional()
  documentNumber?: string;
  @IsOptional()
  taxNumber?: string;
}

class OrganizationUpdateDto {
  @IsOptional()
  businessNumber?: string;
  @IsOptional()
  businessRegistry?: string;
  @IsOptional()
  taxNumber?: string;
  @IsOptional()
  name?: string;
}

class DebtorUpdateDto {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  legalStatus: string;

  @IsOptional()
  naturalPerson?: NaturalPersonUpdateDto;
  @IsOptional()
  organization?: OrganizationUpdateDto;
  @IsOptional()
  addresses?: AddressUpdateDto[];
  @IsOptional()
  contacts?: ContactUpdateDto[];
  @IsOptional()
  assets?: AssetUpdateDto[];
  @IsOptional()
  bankAccounts?: BankAccountUpdateDto[];
  @IsOptional()
  SAPBusinessPartnerId?: string;
}

class InterestUpdateDto {
  @IsOptional()
  dateFrom?: Date;
  @IsOptional()
  dateTo?: Date;
  @IsOptional()
  interestRatePerPeriod?: string;
  @IsOptional()
  period?: string;
  @IsOptional()
  periodAmount?: string;
  @IsOptional()
  interestPrincipal?: string;
  @IsOptional()
  amount?: string;
}

class AddressUpdateDto {
  @IsOptional()
  street?: string;
  @IsOptional()
  houseNumber?: string;
  @IsOptional()
  apartmentNumber?: string;
  @IsOptional()
  postalCode?: string;
  @IsOptional()
  country?: string;
  @IsOptional()
  voivodeship?: string;
  @IsOptional()
  commune?: string;
  @IsOptional()
  city?: string;
  @IsOptional()
  district?: string;
}

class ContactUpdateDto {
  @IsOptional()
  description?: string;
  @IsOptional()
  phone?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  fax?: string;
}

class AssetUpdateDto {
  @IsOptional()
  description?: string;
  @IsOptional()
  value?: string;
  @IsOptional()
  currency?: string;
  @IsOptional()
  name?: string;
}

class BankAccountUpdateDto {
  @IsOptional()
  IBAN?: string;
  @IsOptional()
  number?: string;
}

export class DebtUpdateDto {
  @IsMongoId()
  @IsOptional()
  owner?: string;

  @ValidateNested({ each: true })
  @Type(() => DebtorUpdateDto)
  @IsOptional()
  debtor?: DebtorUpdateDto;

  @IsOptional()
  interests?: InterestUpdateDto[];

  @IsOptional()
  amount?: number;

  @IsEnum(CurrencyCode)
  @IsOptional()
  currencyCode?: string;

  @IsOptional()
  dueDate?: Date;

  @IsOptional()
  amountWithInterest?: number;

  @IsOptional()
  contractNumber?: number;

  @IsOptional()
  documents?: string[];

  @IsOptional()
  evidenceText?: number;
}
