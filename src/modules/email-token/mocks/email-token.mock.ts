import { EmailToken } from 'modules/email-token/schemas';
import { EmailTokenCreateDto } from 'modules/email-token/dtos';
import { createMock } from '@golevelup/ts-jest';

export const emailTokenCreateDto: EmailTokenCreateDto = {
  email: 'fbaumford1@sina.com.cn',
  hash: 'some hash',
  validTo: new Date(),
};

export const emailToken = createMock<EmailToken>({
  email: 'fbaumford1@sina.com.cn',
  hash: 'some hash',
  validTo: new Date(),
});
