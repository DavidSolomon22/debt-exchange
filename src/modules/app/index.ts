import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from 'config';
import { MailerConfigService } from 'config/services/mailer.config.service';
import { AuctionModule } from 'modules/auction';
import { AuthModule } from 'modules/auth';
import { DebtModule } from 'modules/debt';
import { EmailTokenModule } from 'modules/email-token';
import { UserModule } from 'modules/user';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MailerConfigService,
      inject: [ConfigService],
    }),
    AuctionModule,
    AuthModule,
    DebtModule,
    EmailTokenModule,
    UserModule,
  ],
  controllers: [],
  providers: [MongooseConfigService, MailerConfigService],
})
export class AppModule {}
