/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers';
import { User, UserSchema } from './schemas';
import { UserRepository } from './repositories';
import { UserService } from './services';

@Module({
  imports: [
    HttpModule,
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
  providers: [UserRepository, UserService],
})
export class UserModule {}
