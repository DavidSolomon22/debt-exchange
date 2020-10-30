import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from 'src/common/constants';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    default: false,
  })
  emailConfirmed: boolean;

  @Prop({
    required: true,
    select: false,
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

  @Prop({
    type: [String],
    enum: Object.values(UserRole),
  })
  roles: string[];

  @Prop({
    required: true,
  })
  isOrganization: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
