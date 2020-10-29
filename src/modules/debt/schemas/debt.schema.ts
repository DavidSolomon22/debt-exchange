import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Interest, InterestSchema } from './interest.schema';
import { Debtor, DebtorSchema } from './debtor.schema';
import { CurrencyCode } from 'src/common/constants';

@Schema()
export class Debt extends Document {
  @Prop({
    type: [InterestSchema],
  })
  interests: Interest;

  @Prop({
    type: DebtorSchema,
  })
  debtor: Debtor;

  @Prop({
    required: true,
  })
  amount: number;

  @Prop({
    required: true,
    enum: Object.values(CurrencyCode),
  })
  currencyCode: string;

  @Prop({
    required: true,
  })
  dueDate: Date;

  @Prop({
    required: false,
  })
  amountWithInterest: number;

  @Prop({
    required: false,
  })
  contractNumber: number;

  @Prop({
    required: false,
    type: [String],
  })
  documents: string[];

  @Prop({
    required: false,
  })
  evidenceText: number;
}

export const DebtSchema = SchemaFactory.createForClass(Debt);
