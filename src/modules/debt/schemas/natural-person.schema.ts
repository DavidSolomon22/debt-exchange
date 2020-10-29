import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NaturalPerson extends Document {
  @Prop({
    required: false,
  })
  firstName: string;

  @Prop({
    required: false,
  })
  secondName: string;

  @Prop({
    required: false,
  })
  surname: string;

  @Prop({
    required: false,
  })
  documentType: string;

  @Prop({
    required: false,
  })
  documentNumber: string;

  @Prop({
    required: false,
  })
  taxNumber: string;
}

export const NaturalPersonSchema = SchemaFactory.createForClass(NaturalPerson);
