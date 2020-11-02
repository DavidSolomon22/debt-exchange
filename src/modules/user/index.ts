/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module } from '@nestjs/common';
import { UserController } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas';
import { UserRepository } from './repositories';
import { UserService, EmailService } from './services';
import {EmailTokenModule} from 'src/modules/email-token/'

@Module({
  imports: [
    HttpModule,
    EmailTokenModule,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          schema.plugin(require('mongoose-unique-validator'), {
            message: 'User with email {VALUE} already exists.',
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserRepository, UserService, EmailService],
})
export class UserModule {}
