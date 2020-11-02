import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {EmailToken} from '../schemas';
import { PaginateModel, PaginateResult, PaginateOptions } from 'mongoose';
import { EmailTokenCreateDto } from '../dtos';
@Injectable()
export class EmailTokenRepository {
    constructor(
        @InjectModel(EmailToken.name)
        private emailToken: PaginateModel<EmailToken>,
      ) {}

      async createEmailToken(emailToken: EmailTokenCreateDto): Promise<EmailToken> {
        const createdEmailToken = new this.emailToken(emailToken);
        return await createdEmailToken.save();
      }
}