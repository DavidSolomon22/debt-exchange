import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from 'config';
import { AuthModule } from 'modules/auth';
import { UserModule } from 'modules/user';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    MailerModule.forRoot({
      transport: 'smtps://joshuajanex@gmail.com:brab6umh@smtp.gmail.com',
      defaults: {
        from: '"NO-REPLY" <noreply@debtex.com>',
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [MongooseConfigService],
})
export class AppModule {}
