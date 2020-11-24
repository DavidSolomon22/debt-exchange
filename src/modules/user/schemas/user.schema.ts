import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  passwordHash: string;

  @Prop({
    required: false,
  })
  firstName?: string;

  @Prop({
    required: false,
  })
  surname?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
