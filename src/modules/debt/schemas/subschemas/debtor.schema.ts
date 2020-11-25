import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NaturalPerson, NaturalPersonSchema } from './natural-person.schema';
import { Organization, OrganizationSchema } from './organization.schema';
import { Address, AddressSchema } from './address.schema';
import { Contact, ContactSchema } from './contact.schema';
import { Asset, AssetSchema } from './asset.schema';
import { BankAccount, BankAccountSchema } from './bank-account.schema';
import { LegalStatus, Country } from 'common/constants';

@Schema()
export class Debtor extends Document {
  @Prop({
    type: NaturalPersonSchema,
    required: false,
  })
  naturalPerson?: NaturalPerson;

  @Prop({
    type: OrganizationSchema,
    required: false,
  })
  organization?: Organization;

  @Prop({
    type: [AddressSchema],
    required: false,
  })
  addresses?: Address;

  @Prop({
    type: [ContactSchema],
    required: false,
  })
  contacts?: Contact;

  @Prop({
    type: [AssetSchema],
    required: false,
  })
  assets?: Asset;

  @Prop({
    type: [BankAccountSchema],
    required: false,
  })
  bankAccounts?: BankAccount;

  @Prop({
    required: true,
    enum: Object.values(LegalStatus),
  })
  legalStatus: string;

  @Prop({
    required: true,
    enum: Object.values(Country),
  })
  country: string;

  @Prop({
    required: false,
  })
  SAPBusinessPartnerId?: string;
}

export const DebtorSchema = SchemaFactory.createForClass(Debtor);
