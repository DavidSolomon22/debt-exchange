/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module } from '@nestjs/common';
// import { DebtController } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { Debt, DebtSchema } from 'modules/debt/schemas';
// import { DebtRepository } from './repositories';
// import { DebtService } from './services';

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
  controllers: [],
  // controllers: [DebtController],
  exports: [],
  // providers: [DebtRepository, DebtService],
  // providers: [DebtRepository],
  providers: [],
})
export class DebtModule {}
