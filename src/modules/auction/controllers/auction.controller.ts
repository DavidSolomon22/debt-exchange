import {
  Controller,
  Post,
  Body,
  UseGuards,
  DefaultValuePipe,
  Get,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
  Param,
  NotFoundException,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiCookieAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { JwtAuthGuard } from 'guards';
import { ParseSortParamsPipe } from 'pipes';
import { Auction } from '../schemas';
import { AuctionService } from '../services';
import { Bid } from '../schemas/subschemas/bid.schema';
import { User } from 'decorators';
import { AuctionCreateDto, BidCreateDto } from '../dtos';

@Controller('auctions')
@ApiTags('auctions')
@UseGuards(JwtAuthGuard)
@ApiCookieAuth()
export class AuctionController {
  constructor(private auctionService: AuctionService) {}

  @Post()
  async createAuction(
    @Body() auctionCreateDto: AuctionCreateDto,
    @User('userId') auctionFounder: string,
  ): Promise<Auction> {
    return this.auctionService.createAuction(auctionCreateDto, auctionFounder);
  }

  @Post(':id/bids')
  async createBid(
    @Param('id') id: string,
    @Body() bidCreateDto: BidCreateDto,
    @User('userId') bidder: string,
  ): Promise<Bid[]> {
    return this.auctionService.createBid(id, bidCreateDto, bidder);
  }

  @Get()
  @ApiQuery({ name: 'pageNumber', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'fields', required: false })
  @ApiQuery({ name: 'populates', required: false })
  @ApiQuery({ name: 'orderBy', required: false })
  async getAuctions(
    @Query('pageNumber', new DefaultValuePipe(1), ParseIntPipe)
    pageNumber?: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe)
    pageSize?: number,
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe)
    fields?: string[],
    @Query('populates', new DefaultValuePipe([]), ParseArrayPipe)
    populates?: string[],
    @Query(
      'orderBy',
      new DefaultValuePipe([]),
      ParseArrayPipe,
      new ParseSortParamsPipe(),
    )
    orderBy?: string,
  ): Promise<PaginateResult<Auction>> {
    const options = {
      page: pageNumber,
      limit: pageSize,
      select: fields,
      populate: populates,
      sort: orderBy,
    };
    return await this.auctionService.getPaginatedAuctions(options);
  }

  @Get(':id')
  @ApiQuery({ name: 'fields', required: false })
  @ApiQuery({ name: 'populates', required: false })
  async getAuction(
    @Param('id') id: string,
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe)
    fields?: string[],
    @Query('populates', new DefaultValuePipe([]), ParseArrayPipe)
    populates?: string[],
  ): Promise<Auction> {
    const options = {
      select: fields,
      populate: populates,
    };
    const auction = await this.auctionService.getAuction(id, options);
    if (!auction) {
      throw new NotFoundException();
    } else {
      return auction;
    }
  }

  @Get(':id/bids')
  async getAuctionBids(@Param('id') id: string): Promise<Bid[]> {
    const auctionBids = await this.auctionService.getAuctionBids(id);
    if (!auctionBids) {
      throw new NotFoundException();
    } else {
      return auctionBids;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAuction(@Param('id') id: string): Promise<void> {
    const auction = await this.auctionService.deleteAuction(id);
    if (!auction) {
      throw new NotFoundException();
    }
  }
}
