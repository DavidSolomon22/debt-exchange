import { Injectable } from '@nestjs/common';
import { PaginateResult, PaginateOptions } from 'mongoose';
import { User } from '../schemas';
import { UserRepository } from 'modules/user/repositories';
import { UserCreateDto, UserUpdateDto } from 'modules/user/dtos';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: UserCreateDto): Promise<User> {
    return await this.userRepository.createUser(user);
  }

  async getPaginatedUsers(
    options: PaginateOptions = {},
    filterParams: any = {},
  ): Promise<PaginateResult<User>> {
    const { minAge, maxAge } = filterParams;
    const filterQuery = {
      // age: { $gte: minAge, $lte: maxAge },
    };
    return await this.userRepository.getPaginatedUsers(options, filterQuery);
  }

  async getUser(id: string, options: PaginateOptions = {}): Promise<User> {
    return await this.userRepository.getUser(id, options);
  }

  async updateUser(
    id: string,
    user: UserUpdateDto,
    options: PaginateOptions = {},
  ): Promise<User> {
    return await this.userRepository.updateUser(id, user, options);
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userRepository.deleteUser(id);
  }

  async getOneByEmailWithHash(email: string): Promise<User> {
    return await this.userRepository.getOneByEmailWithHash(email);
  }
}
