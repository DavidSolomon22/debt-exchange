import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LegalStatus, Country } from 'src/common/constants';
import { NaturalPerson, NaturalPersonSchema } from './natural-person.schema';
import { Organization, OrganizationSchema } from './organization.schema';
import { Address, AddressSchema } from './address.schema';
import { Contact, ContactSchema } from './contact.schema';
import { Asset, AssetSchema } from './asset.schema';
import { BankAccount, BankAccountSchema } from './bank-account.schema';

@Schema()
export class Debtor extends Document {
  @Prop({
    type: NaturalPersonSchema,
  })
  naturalPerson: NaturalPerson;

  @Prop({
    type: OrganizationSchema,
  })
  organization: Organization;

  @Prop({
    type: [AddressSchema],
  })
  addresses: Address;

  @Prop({
    type: [ContactSchema],
  })
  contacts: Contact;

  @Prop({
    type: [AssetSchema],
  })
  assets: Asset;

  @Prop({
    type: [BankAccountSchema],
  })
  bankAccounts: BankAccount;

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
  SAPBusinessPartnerId: string;
}

export const DebtorSchema = SchemaFactory.createForClass(Debtor);
