import { HttpModule, Module } from '@nestjs/common';
import { DebtController } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { Debt, DebtSchema } from './schemas';
import { DebtRepository } from './repositories';
import { DebtService } from './services';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeatureAsync([
      {
        name: Debt.name,
        useFactory: () => {
          const schema = DebtSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
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
