import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Asset extends Document {
  @Prop({
    required: false,
  })
  description?: string;

  @Prop({
    required: false,
  })
  value?: string;

  @Prop({
    required: false,
  })
  currency?: string;

  @Prop({
    required: false,
  })
  name?: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
