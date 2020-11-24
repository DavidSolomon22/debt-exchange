import { LoginDto, RegisterDto } from 'modules/auth/dtos';
import { UserCreateDto, UserUpdateDto } from 'modules/user/dtos';
import { User } from 'modules/user/schemas';
import { PaginateResult } from 'mongoose';

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
