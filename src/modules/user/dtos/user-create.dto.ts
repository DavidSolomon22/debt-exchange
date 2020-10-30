export class UserCreateDto {
  email: string;
  passwordHash: string;
  firstName: string;
  surname: string;
  isOrganization: boolean;
}
