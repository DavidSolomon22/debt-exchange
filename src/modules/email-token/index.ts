/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailToken, EmailTokenSchema } from './schemas';
import { EmailTokenRepository } from './repositories';
import { UserModule } from 'modules/user';
import { EmailTokenService } from './services';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => UserModule),
    MongooseModule.forFeatureAsync([
      {
        name: EmailToken.name,
        useFactory: () => {
          const schema = EmailTokenSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [],
  exports: [EmailTokenService],
  providers: [EmailTokenRepository, EmailTokenService],
})
export class EmailTokenModule {}
