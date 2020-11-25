/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DebtController } from 'modules/debt/controllers';
import { DebtRepository } from 'modules/debt/repositories';
import { Debt, DebtSchema } from 'modules/debt/schemas';
import { DebtService } from 'modules/debt/services';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeatureAsync([
      {
        name: Debt.name,
        useFactory: () => {
          const schema = DebtSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [DebtController],
  exports: [],
  providers: [DebtRepository, DebtService],
})
export class DebtModule {}
