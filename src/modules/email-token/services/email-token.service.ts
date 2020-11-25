import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { EmailTokenRepository } from '../repositories';
import { EmailToken } from '../schemas';
import { EmailTokenCreateDto } from '../dtos';
import { UserService } from 'modules/user/services';

@Injectable()
export class EmailTokenService {
  constructor(
    private emailTokenRepository: EmailTokenRepository,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async createEmailToken(email: string): Promise<EmailToken> {
    const createdToken = this.createTokenPayload(email);
    return this.emailTokenRepository.createEmailToken(createdToken);
  }

  async confirmUser(hash: string, email: string): Promise<boolean> {
    const emailToken = await this.emailTokenRepository.getByHashAndEmail(
      hash,
      email,
    );
    if (emailToken) {
      await this.userService.confirmEmail(email);
      await this.emailTokenRepository.deleteToken(emailToken._id);
      return true;
    } else {
      return false;
    }
  }

  async resetPassword(hash: string, email: string): Promise<boolean> {
    const emailToken = await this.emailTokenRepository.getByHashAndEmail(
      hash,
      email,
    );
    if (emailToken) {
      await this.userService.resetPassword(email);
      await this.emailTokenRepository.deleteToken(emailToken._id);
      return true;
    } else {
      return false;
    }
  }

  makeid(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  createTokenPayload(email: string): EmailTokenCreateDto {
    return {
      email,
      hash: this.makeid(30),
      validTo: this.makeExpirationTime(),
    };
  }

  makeExpirationTime(): Date {
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + 600 * 1000);
    return expiration;
  }
}
