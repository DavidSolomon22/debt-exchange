import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PaginateResult, PaginateOptions } from 'mongoose';
import { User } from '../schemas';
import { UserRepository } from '../repositories';
import { UserCreateDto, UserDto } from '../dtos';
import {EmailService} from './email.service';
import {EmailTokenService} from 'src/modules/email-token/services'
@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private emailTokenService: EmailTokenService) {}

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
    const createdUser = await this.userRepository.createUser(user)
    const createdToken = await this.emailTokenService.createEmailToken(createdUser.email)
    console.log(createdToken)
    await this.emailService.emailConfirmation(createdUser.email, createdToken.hash);
    return createdUser
  }

  async getOne(id: string): Promise<User> {
    return await this.userRepository.getUser(id);
  }

  async confirmEmail(email: string):Promise<void>{
    await this.userRepository.confirmUserEmail(email)
  }

  async getOneByEmailWithHash(email: string): Promise<User> {
    return await this.userRepository.getOneByEmailWithHash(email);
  }
}
