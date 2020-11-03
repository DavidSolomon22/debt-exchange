import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {ConfirmationEmail,ResetPasswordEmail,ConfirmationResetPasswordEmail} from 'src/common/constants/email.constant'

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}
  
  public async emailConfirmation(email: string, hash: string): Promise<any> {
      try{
        const mail = await this
        .mailerService
        .sendMail({
          to: email, // list of receivers
          from: 'noreply@debtex.com', // sender address
          subject: 'Confirm your email', // Subject line
          html: ConfirmationEmail(email, hash),
        })
        return mail
      } catch(err){
        console.log(err)
      }
  }
  public async emailResetPassword(email: string, hash: string): Promise<any> {
    try{
      const mail = await this
      .mailerService
      .sendMail({
        to: email, // list of receivers
        from: 'noreply@debtex.com', // sender address
        subject: 'Reset Your Password', // Subject line
        html: ResetPasswordEmail(email, hash),
      })
      return mail
    } catch(err){
      console.log(err)
    }
  }
  public async emailResetConfirmation(email: string, password: string): Promise<any>{
    try{
      const mail = await this
      .mailerService
      .sendMail({
        to: email, // list of receivers
        from: 'noreply@debtex.com', // sender address
        subject: 'Your Password Was Reseted', // Subject line
        html: ConfirmationResetPasswordEmail(email, password),
      })
      return mail
    } catch(err){
      console.log(err)
    }
  }
}
  