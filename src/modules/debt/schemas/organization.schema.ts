import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Organization extends Document {
  @Prop({
    required: false,
  })
  businessNumber: string;

  @Prop({
    required: false,
  })
  businessRegistry: string;

  @Prop({
    required: false,
  })
  taxNumber: string;

  @Prop({
    required: false,
  })
  name: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
