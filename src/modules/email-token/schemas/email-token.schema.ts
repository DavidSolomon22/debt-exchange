import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EmailToken extends Document {
  @Prop({
    required: true,
  })
  hash: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  validTo: Date;
}

export const EmailTokenSchema = SchemaFactory.createForClass(EmailToken);