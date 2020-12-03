import { PaginateModel, PaginateResult, PaginateOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';
import { Auction } from '../schemas';
import { IAuctionCreate, IBidCreate } from '../interfaces';
import { Bid } from '../schemas/subschemas/bid.schema';

@Injectable()
export class AuctionRepository {
  constructor(
    @InjectModel('Auction')
    private auctionModel: PaginateModel<Auction>,
  ) {}

  async createAuction(auction: IAuctionCreate): Promise<Auction> {
    return this.auctionModel.create(auction as any);
  }

  async createBid(auctionId: string, bid: IBidCreate): Promise<Bid[]> {
    return this.auctionModel
      .findByIdAndUpdate(
        auctionId,
        {
          $push: { bidHistory: bid as any },
        },
        { new: true, runValidators: true, context: 'query' },
      )
      .select('bidHistory')
      .lean(true);
  }

  async getPaginatedAuctions(
    options: PaginateOptions = {},
    filterQuery: FilterQuery<Auction> = {},
  ): Promise<PaginateResult<Auction>> {
    return this.auctionModel.paginate(filterQuery, options);
  }

  async getAuction(
    id: string,
    options: PaginateOptions = {},
  ): Promise<Auction> {
    const { select, populate } = options;
    let { lean } = options;
    if (lean === undefined || lean === null) {
      lean = true;
    }
    return this.auctionModel
      .findById(id)
      .select(select)
      .populate(populate)
      .lean(lean);
  }

  async getAuctionBids(auctionId: string): Promise<Auction> {
    return await this.auctionModel
      .findById(auctionId)
      .select('bidHistory')
      .lean(true);
  }

  async deleteAuction(id: string): Promise<Auction> {
    return await this.auctionModel.findByIdAndDelete(id);
  }
}
