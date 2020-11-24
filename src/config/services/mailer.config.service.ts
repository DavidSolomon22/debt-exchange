import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    const mailUserAccount = this.configService.get<string>('MAIL_USER_ACCOUNT');
    const mailUserPassword = this.configService.get<string>(
      'MAIL_USER_PASSWORD',
    );
    this.configService.get<string>('MAIL_USER_PASSWORD');
    return {
      transport: `smtps://${mailUserAccount}:${mailUserPassword}@smtp.gmail.com`,
      defaults: {
        from: '"NO-REPLY" <noreply@debtex.com>',
      },
    };
  }
}
