import { EmailService } from './email.service'
import { MailerService } from '@nestjs-modules/mailer';

describe('CatsController', () => {
    let emailService: EmailService;
    let mailerService: MailerService;
    beforeEach(() => {
        emailService = new EmailService(mailerService);
    });

    describe('EmailService', () => {
        it('should have email confirmation method', () => {
            expect(emailService.emailConfirmation).toBeTruthy()
        });
    });
});