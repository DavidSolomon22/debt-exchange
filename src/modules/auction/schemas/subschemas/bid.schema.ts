import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

// create dto only for bid
@Schema()
export class Bid extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  bidder: Types.ObjectId; // not in create dto (taken from jwt (req.user))

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  bidPrice: number; // not in create dto, but in bid create dto

  @Prop({
    type: Date,
    required: true,
    default: new Date(),
  })
  bidTimestamp: Date; // not in create dto, autogenerated after update
}

export const BidSchema = SchemaFactory.createForClass(Bid);