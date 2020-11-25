import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Interest extends Document {
  @Prop({
    required: true,
  })
  dateFrom: Date;

  @Prop({
    required: true,
  })
  dateTo: Date;

  @Prop({
    required: true,
  })
  interestRatePerPeriod: string;

  @Prop({
    required: true,
  })
  period: string;

  @Prop({
    required: true,
  })
  periodAmount: string;

  @Prop({
    required: true,
  })
  interestPrincipal: string;

  @Prop({
    required: true,
  })
  amount: string;
}

export const InterestSchema = SchemaFactory.createForClass(Interest);
