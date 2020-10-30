import { Injectable } from '@nestjs/common';
import { PaginateResult, PaginateOptions } from 'mongoose';
import { User } from '../schemas';
import { UserRepository } from '../repositories';
import { UserCreateDto, UserDto } from '../dtos';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getPaginatedUsers(
    options: PaginateOptions,
    filterParams,
  ): Promise<PaginateResult<User>> {
    const { minAge, maxAge } = filterParams;
    const filterQuery = {
      age: { $gte: minAge, $lte: maxAge },
    };
    return await this.userRepository.getPaginatedUsers(options, filterQuery);
  }

  async createUser(user: UserCreateDto): Promise<UserDto> {
    return await this.userRepository.createUser(user);
  }

  async getOne(id: string): Promise<User> {
    return await this.userRepository.getUser(id);
  }

  async getOneByEmailWithHash(email: string): Promise<User> {
    return await this.userRepository.getOneByEmailWithHash(email);
  }
}
