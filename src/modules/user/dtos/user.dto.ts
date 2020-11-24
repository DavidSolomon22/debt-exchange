import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @Expose()
  _id: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  firstName?: string;

  @IsString()
  @Expose()
  surname?: string;
}
