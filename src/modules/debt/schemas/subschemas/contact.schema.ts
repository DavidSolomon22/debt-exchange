import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Contact extends Document {
  @Prop({
    required: false,
  })
  description: string;

  @Prop({
    required: false,
  })
  phone: string;

  @Prop({
    required: false,
  })
  email: string;

  @Prop({
    required: false,
  })
  fax: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
