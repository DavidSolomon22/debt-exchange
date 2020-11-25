import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop({
    required: false,
  })
  street?: string;

  @Prop({
    required: false,
  })
  houseNumber?: string;

  @Prop({
    required: false,
  })
  apartmentNumber?: string;

  @Prop({
    required: false,
  })
  postalCode?: string;

  @Prop({
    required: false,
  })
  country?: string;

  @Prop({
    required: false,
  })
  voivodeship?: string;

  @Prop({
    required: false,
  })
  commune?: string;

  @Prop({
    required: false,
  })
  city?: string;

  @Prop({
    required: false,
  })
  district?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
