import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Interest, InterestSchema } from './interest.schema';
import { Debtor, DebtorSchema } from './debtor.schema';
import { CurrencyCode } from 'src/common/constants';

@Schema()
export class Debt extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: Types.ObjectId;

  @Prop({
    type: DebtorSchema,
    required: true,
  })
  debtor: Debtor;

  @Prop({
    type: [InterestSchema],
    required: false,
  })
  interests: Interest;

  @Prop({
    required: true,
  })
  amount: number;

  @Prop({
    enum: Object.values(CurrencyCode),
    required: true,
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
    type: [String],
    required: false,
  })
  documents: string[];

  @Prop({
    required: false,
  })
  evidenceText: number;
}

export const DebtSchema = SchemaFactory.createForClass(Debt);
