export interface UserCreateDto {
  email: string;
  passwordHash: string;
  firstName?: string;
  surname?: string;
}
