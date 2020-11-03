import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    NotFoundException,
    Query,
    ParseIntPipe,
    DefaultValuePipe,
    ParseArrayPipe,
    UseGuards,
  } from '@nestjs/common';
  import { EmailTokenService } from '../services';
  
  @Controller('email-tokens')
  export class EmailTokenController {
    constructor(
      private emailTokenService: EmailTokenService
    ) {}
  
    @Get(':id')
    async confirmUserThroughEmailToken(
        @Param('id') id: string,
        @Query('email') email: string
    ):Promise<Boolean> {
      const confirmation = await this.emailTokenService.confirmUser(id,email);
      if (!confirmation) {
        throw new NotFoundException();
      } else {
        return confirmation;
      }
    }
  }