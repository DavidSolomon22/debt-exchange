import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DebtModule } from './modules/debt';
import { UserModule } from './modules/user';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/debt-exchange-db'),
    DebtModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
