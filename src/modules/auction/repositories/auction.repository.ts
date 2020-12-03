import { PaginateModel, PaginateResult, PaginateOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';
import { Auction } from '../schemas';
import { IBidCreate } from '../interfaces';
import { Bid } from '../schemas/subschemas/bid.schema';

@Injectable()
export class AuctionRepository {
  constructor(
    @InjectModel('Auction')
    private auctionModel: PaginateModel<Auction>,
  ) {}

  async createAuction(IAuctionCreate): Promise<Auction> {}

  async createBid(auctionId: string, bid: IBidCreate): Promise<Bid[]> {}

  async getPaginatedAuctions(
    options: PaginateOptions = {},
    filterQuery: FilterQuery<Auction> = {},
  ): Promise<PaginateResult<Auction>> {}

  async getAuction(
    id: string,
    options: PaginateOptions = {},
  ): Promise<Auction> {}

  async getAuctionBids(auctionId: string): Promise<Bid[]> {}

  async deleteAuction(id: string): Promise<Auction> {}
}
