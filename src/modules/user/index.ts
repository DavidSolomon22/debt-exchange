/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module } from '@nestjs/common';
import { UserController } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
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
  exports: [UserService, UserRepository],
  providers: [UserRepository, UserService],
})
export class UserModule {}
