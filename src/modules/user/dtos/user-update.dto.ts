import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  surname?: string;
}
