import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Debt extends Document {
  @Prop({
    required: true,
  })
  amount: number;

  @Prop({
    required: true,
    enum: [],
  })
  currencyCode: string;
}

export const DebtSchema = SchemaFactory.createForClass(Debt);
