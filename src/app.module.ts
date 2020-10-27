import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/debt-exchange-db'),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
