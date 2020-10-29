import { Injectable } from '@nestjs/common';
import { PaginateResult, PaginateOptions } from 'mongoose';
import { User } from '../schemas';
import { UserRepository } from '../repositories';

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
}
