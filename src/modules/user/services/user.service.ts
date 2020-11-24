import { Injectable } from '@nestjs/common';
import { PaginateResult, PaginateOptions } from 'mongoose';
import { User } from '../schemas';
import { UserRepository } from 'modules/user/repositories';
import { UserCreateDto, UserUpdateDto } from 'modules/user/dtos';
import { EmailService } from 'services/email';
import { EmailTokenService } from 'modules/email-token/services';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private emailTokenService: EmailTokenService,
  ) {}

  async createUser(user: UserCreateDto): Promise<User> {
    const createdUser = await this.userRepository.createUser(user);
    const createdToken = await this.emailTokenService.createEmailToken(
      createdUser.email,
    );
    await this.emailService.emailConfirmation(
      createdUser.email,
      createdToken.hash,
    );
    return createdUser;
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

  async resetPasswordRequest(email: string): Promise<boolean> {
    const resetPasswordRequestedUser = await this.getOneByEmailWithHash(email);
    if (resetPasswordRequestedUser) {
      const createdToken = await this.emailTokenService.createEmailToken(email);
      await this.emailService.emailResetPassword(email, createdToken.hash);
      return true;
    } else {
      return false;
    }
  }

  async confirmEmail(email: string): Promise<void> {
    await this.userRepository.confirmUserEmail(email);
  }

  async resetPassword(email: string): Promise<void> {
    const newPassword = this.emailTokenService.makeid(10);
    await this.userRepository.resetUserPassword(email, newPassword);
    await this.emailService.emailResetConfirmation(email, newPassword);
  }
}
