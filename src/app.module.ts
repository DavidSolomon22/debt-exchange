import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule } from '@nestjs/config';
import { DebtModule } from './modules/debt';
import { UserModule } from './modules/user';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/debt-exchange-db'),
    MailerModule.forRoot({
      transport: 'smtps://joshuajanex@gmail.com:brab6umh@smtp.gmail.com',
      defaults: {
        from:'"NO-REPLY" <noreply@debtex.com>',
      },
    }),
    DebtModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
