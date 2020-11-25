import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { EmailTokenService } from '../services';

@Controller('email-tokens')
export class EmailTokenController {
  constructor(private emailTokenService: EmailTokenService) {}

  @Get(':hash/email-verify')
  async confirmUserThroughEmailToken(
    @Param('hash') hash: string,
    @Query('email') email: string,
  ): Promise<boolean> {
    const confirmation = await this.emailTokenService.confirmUser(hash, email);
    if (!confirmation) {
      throw new NotFoundException();
    } else {
      return confirmation;
    }
  }

  @Get(':hash/password-reset')
  async resetPasswordThroughEmailToken(
    @Param('hash') hash: string,
    @Query('email') email: string,
  ): Promise<boolean> {
    const confirmation = await this.emailTokenService.resetPassword(
      hash,
      email,
    );
    if (!confirmation) {
      throw new NotFoundException();
    } else {
      return confirmation;
    }
  }
}
