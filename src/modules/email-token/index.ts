/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailToken, EmailTokenSchema } from './schemas';
import { EmailTokenRepository } from './repositories';
import { EmailTokenService } from './services';

@Module({
  imports: [
    HttpModule,
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