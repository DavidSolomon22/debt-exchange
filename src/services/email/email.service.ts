import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {
  ConfirmationEmail,
  ResetPasswordEmail,
  ConfirmationResetPasswordEmail,
} from 'common/constants';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async emailConfirmation(email: string, hash: string): Promise<any> {
    try {
      const mail = await this.mailerService.sendMail({
        to: email,
        from: 'noreply@debtex.com',
        subject: 'Confirm your email',
        html: ConfirmationEmail(email, hash),
      });
      return mail;
    } catch (err) {
      console.log(err);
    }
  }

  public async emailResetPassword(email: string, hash: string): Promise<any> {
    try {
      const mail = await this.mailerService.sendMail({
        to: email,
        from: 'noreply@debtex.com',
        subject: 'Reset Your Password',
        html: ResetPasswordEmail(email, hash),
      });
      return mail;
    } catch (err) {
      console.log(err);
    }
  }

  public async emailResetConfirmation(
    email: string,
    password: string,
  ): Promise<any> {
    try {
      const mail = await this.mailerService.sendMail({
        to: email,
        from: 'noreply@debtex.com',
        subject: 'Your Password Was Reseted',
        html: ConfirmationResetPasswordEmail(email, password),
      });
      return mail;
    } catch (err) {
      console.log(err);
    }
  }
}
