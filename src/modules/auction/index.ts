/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionController } from './controllers';
import { AuctionGateway } from './gateways';
import { AuctionRepository } from './repositories';
import { Auction, AuctionSchema } from './schemas';
import { AuctionService } from './services';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeatureAsync([
      {
        name: Auction.name,
        useFactory: () => {
          const schema = AuctionSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [AuctionController],
  exports: [],
  providers: [AuctionRepository, AuctionService, AuctionGateway],
})
export class AuctionModule {}
