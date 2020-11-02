import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  
  public async emailConfirmation(email: string, hash: string): Promise<any> {
      try{
        const mail = await this
        .mailerService
        .sendMail({
          to: email, // list of receivers
          from: 'noreply@debtex.com', // sender address
          subject: 'Confirm your email', // Subject line
          text: 'Please Confirm Your Email', // plaintext body
        })
        return mail
      } catch(err){
        console.log(err)
      }
  }
}
  