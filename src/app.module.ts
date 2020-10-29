import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DebtModule } from './modules/debt';
import { UserModule } from './modules/user';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/debt-exchange-db'),
    DebtModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
