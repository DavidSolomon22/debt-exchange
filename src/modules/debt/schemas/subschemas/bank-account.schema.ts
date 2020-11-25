import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BankAccount extends Document {
  @Prop({
    required: false,
  })
  IBAN?: string;

  @Prop({
    required: false,
  })
  number?: string;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);
