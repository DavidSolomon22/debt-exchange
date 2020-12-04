import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'modules/auth/services';
import { AuctionController } from '.';
import {
  auction,
  auctionCreateDto,
  auctionId,
  bids,
  newBid,
  paginatedAuctions,
  userId,
} from '../mocks';
import { Auction } from '../schemas';
import { AuctionService } from '../services';

describe('AuctionController', () => {
  let controller: AuctionController;
  let service: AuctionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionController],
      providers: [
        {
          provide: AuctionService,
          useValue: {
            createAuction: jest.fn(),
            createBid: jest.fn(),
            getPaginatedAuctions: jest.fn(),
            getAuction: jest.fn(),
            getAuctionBids: jest.fn(),
            deleteAuction: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuctionController>(AuctionController);
    service = module.get<AuctionService>(AuctionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAuction', () => {
    it('should return created auction', async () => {
      const auctionCreateDtoMock = auctionCreateDto;
      const auctionFounder = userId;
      const auctionMock = auction;
      const createAuctionSpy = jest
        .spyOn(service, 'createAuction')
        .mockResolvedValue(auctionMock);
      const response = await controller.createAuction(
        auctionCreateDtoMock,
        auctionFounder,
      );
      expect(response).toStrictEqual(auctionMock);
      expect(createAuctionSpy).toHaveBeenCalledTimes(1);
      expect(createAuctionSpy).toHaveBeenCalledWith(
        auctionCreateDtoMock,
        auctionFounder,
      );
    });
  });

  describe('createBid', () => {
    it('should return array of bids with newly created bid', async () => {
      const auctionIdMock = auctionId;
      const bidder = userId;
      const newBidMock = newBid;
      const bidsMock = bids;
      bidsMock.push(newBidMock);
      const createBidSpy = jest
        .spyOn(service, 'createBid')
        .mockResolvedValue(bidsMock);
      const response = await controller.createBid(
        auctionIdMock,
        newBidMock,
        bidder,
      );
      expect(response).toStrictEqual(bidsMock);
      expect(createBidSpy).toHaveBeenCalledTimes(1);
      expect(createBidSpy).toHaveBeenCalledWith(
        auctionIdMock,
        newBidMock,
        bidder,
      );
    });
  });

  describe('getAuctions', () => {
    it('should return paginated auctions', async () => {
      const paginatedAuctionsMock = paginatedAuctions;
      const getPaginatedAuctionsSpy = jest
        .spyOn(service, 'getPaginatedAuctions')
        .mockResolvedValue(paginatedAuctionsMock);
      const response = await controller.getAuctions();
      expect(response).toStrictEqual(paginatedAuctionsMock);
      expect(getPaginatedAuctionsSpy).toBeCalledTimes(1);
    });
  });

  describe('getAuction', () => {
    it('should return one auction', async () => {
      const auctionMock = auction;
      const { _id: id } = auctionMock;
      const getAuctionSpy = jest
        .spyOn(service, 'getAuction')
        .mockResolvedValueOnce(auctionMock);
      const response = await controller.getAuction(id);
      expect(response).toStrictEqual(auctionMock);
      expect(getAuctionSpy).toHaveBeenCalledTimes(1);
      expect(getAuctionSpy).toHaveBeenCalledWith(id, {});
    });
    it('should throw NotFoundException when auction not found', async () => {
      const id = 'some unknown id';
      jest.spyOn(service, 'getAuction').mockResolvedValueOnce(null);
      expect(controller.getAuction(id)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('getAuctionBids', () => {
    it('should return array of bids', async () => {
      const auctionIdMock = auctionId;
      const bidsMock = bids;
      const getAuctionBidsSpy = jest
        .spyOn(service, 'getAuctionBids')
        .mockResolvedValueOnce(bidsMock);
      const response = await controller.getAuctionBids(auctionIdMock);
      expect(response).toStrictEqual(bidsMock);
      expect(getAuctionBidsSpy).toHaveBeenCalledTimes(1);
      expect(getAuctionBidsSpy).toHaveBeenCalledWith(auctionIdMock);
    });
    it('should throw NotFoundException when auction not found', async () => {
      const id = 'some unknown id';
      jest.spyOn(service, 'getAuctionBids').mockResolvedValueOnce(null);
      expect(controller.getAuctionBids(id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('deleteAuction', () => {
    it('should return undefined when auction deleted successfully', async () => {
      const auctionMock = auction;
      const { _id: id } = auctionMock;
      const deleteAuctionSpy = jest
        .spyOn(service, 'deleteAuction')
        .mockResolvedValueOnce(auctionMock);
      const response = await controller.deleteAuction(id);
      expect(response).toBeUndefined();
      expect(deleteAuctionSpy).toHaveBeenCalledWith(id);
      expect(deleteAuctionSpy).toHaveReturnedWith<Auction>(auctionMock);
    });
    it('should throw NotFoundException when auction not found', async () => {
      const id = 'some unknown id';
      jest.spyOn(service, 'deleteAuction').mockResolvedValueOnce(null);
      expect(controller.deleteAuction(id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
