import { LoginDto, RegisterDto } from 'modules/auth/dtos';
import { UserCreateDto, UserUpdateDto } from 'modules/user/dtos';
import { hashSync } from 'bcrypt';

export const usersForRegistration: RegisterDto[] = [
  {
    email: 'bleedes0@nytimes.com',
    password: 'IU0pxOIk',
    firstName: 'Barny',
    surname: 'Leedes',
  },
  {
    email: 'fbaumford1@sina.com.cn',
    password: 'tIitlEZpWGa',
    firstName: 'Fitzgerald',
    surname: 'Baumford',
  },
  {
    email: 'dcamellini2@hexun.com',
    password: 'rGXCAf',
    firstName: 'Douglass',
    surname: 'Camellini',
  },
];

export const usersForCreation: UserCreateDto[] = [
  {
    email: 'bleedes0@nytimes.com',
    passwordHash: hashSync('IU0pxOIk', 10),
    firstName: 'Barny',
    surname: 'Leedes',
    emailConfirmed: true,
  },
  {
    email: 'fbaumford1@sina.com.cn',
    passwordHash: hashSync('tIitlEZpWGa', 10),
    firstName: 'Fitzgerald',
    surname: 'Baumford',
    emailConfirmed: true,
  },
  {
    email: 'dcamellini2@hexun.com',
    passwordHash: hashSync('rGXCAf', 10),
    firstName: 'Douglass',
    surname: 'Camellini',
    emailConfirmed: true,
  },
];

export const usersForLogin: LoginDto[] = [
  {
    email: 'bleedes0@nytimes.com',
    password: 'IU0pxOIk',
  },
  {
    email: 'fbaumford1@sina.com.cn',
    password: 'tIitlEZpWGa',
  },
  {
    email: 'dcamellini2@hexun.com',
    password: 'rGXCAf',
  },
];

export const userForUpdate: UserUpdateDto = {
  firstName: 'Caldwell',
  surname: 'Cordero',
};
