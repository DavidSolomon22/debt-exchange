import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { EmailToken } from 'modules/email-token/schemas';
import { EmailTokenCreateDto } from 'modules/email-token/dtos';

@Injectable()
export class EmailTokenRepository {
  constructor(
    @InjectModel(EmailToken.name)
    private emailTokenModel: PaginateModel<EmailToken>,
  ) {}

  async createEmailToken(emailToken: EmailTokenCreateDto): Promise<EmailToken> {
    return this.emailTokenModel.create(emailToken);
  }

  async getByIdAndEmail(id: string, email: string): Promise<EmailToken> {
    return this.emailTokenModel.findOne({ _id: id, email: email });
  }

  async getByHashAndEmail(hash: string, email: string): Promise<EmailToken> {
    return this.emailTokenModel.findOne({ hash, email });
  }

  async deleteToken(id: string): Promise<EmailToken> {
    return this.emailTokenModel.findByIdAndDelete(id);
  }
}
