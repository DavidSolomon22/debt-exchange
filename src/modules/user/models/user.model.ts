import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
    default: false,
  })
  emailConfirmed: boolean;

  @Prop({
    required: true,
  })
  passwordHash: string;

  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  surname: string;

  @Prop([String])
  roles: string[];

  @Prop()
  isOrganization: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
