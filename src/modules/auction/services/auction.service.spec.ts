import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { createEmptyPaginatedResultMock } from 'common/mocks';
import {
  paginatedAuctions,
  auction,
  auctionBids,
  iAuctionCreate,
  auctionCreateDto,
  userId,
} from '../mocks';
import { AuctionRepository } from '../repositories';
import { Auction } from '../schemas';
import { Bid } from '../schemas/subschemas/bid.schema';
import { AuctionService } from './auction.service';

describe('AuctionService', () => {
  let service: AuctionService;
  let repository: AuctionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuctionService,
        {
          provide: AuctionRepository,
          useValue: {
            createAuction: jest.fn(),
            createBid: jest.fn(),
            getPaginatedAuctions: jest.fn(),
            getAuction: jest.fn(),
            getAuctionBids: jest.fn(),
            deleteAuction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuctionService>(AuctionService);
    repository = module.get<AuctionRepository>(AuctionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createAuction', () => {
    it('should return created auction', async () => {
      const auctionCreateDtoMock = auctionCreateDto;
      const auctionFounder = userId;
      const auctionMock = auction;
      jest.spyOn(repository, 'createAuction').mockResolvedValue(auctionMock);
      const response = await service.createAuction(
        auctionCreateDtoMock,
        auctionFounder,
      );
      expect(response).toStrictEqual(auctionMock);
    });
    it('should generate socketAuctionId and assign auctionFounder to IAuctionCreate object', async () => {
      const auctionCreateDtoMock = auctionCreateDto;
      const auctionFounder = userId;
      const iAuctionCreateMock = iAuctionCreate;
      const auctionMock = auction;
      const createAuctionSpy = jest
        .spyOn(repository, 'createAuction')
        .mockResolvedValue(auctionMock);
      await service.createAuction(auctionCreateDtoMock, auctionFounder);
      expect(createAuctionSpy).toHaveBeenCalledTimes(1);
      expect(createAuctionSpy).toHaveBeenCalledWith(iAuctionCreateMock);
    });
  });

  describe('createBid', () => {
    it('should return array of bids with newly created bid', async () => {});
    it('should generate bidTimestamp and assign bidder to IBidCreate object', async () => {});
    it('should not allow to create new bid if there is already bid with later timestamp', async () => {});
  });

  describe('getPaginatedAuctions', () => {
    it('should return paginated auctions', async () => {
      const paginatedAuctionsMock = paginatedAuctions;
      const getPaginatedAuctionsSpy = jest
        .spyOn(repository, 'getPaginatedAuctions')
        .mockResolvedValue(paginatedAuctionsMock);
      const response = await service.getPaginatedAuctions();
      expect(response).toStrictEqual(paginatedAuctionsMock);
      expect(getPaginatedAuctionsSpy).toBeCalledTimes(1);
    });
    it('should return empty docs array if auctions collection is empty', async () => {
      const emptyPaginatedResult = createEmptyPaginatedResultMock<Auction>();
      jest
        .spyOn(repository, 'getPaginatedAuctions')
        .mockResolvedValue(emptyPaginatedResult);
      const response = await service.getPaginatedAuctions();
      expect(response).toStrictEqual(emptyPaginatedResult);
    });
  });

  describe('getAuction', () => {
    it('should return one auction', async () => {
      const auctionMock = auction;
      const id = 'some id';
      auctionMock._id = id;
      const getAuctionSpy = jest
        .spyOn(repository, 'getAuction')
        .mockResolvedValueOnce(auctionMock);
      const response = await service.getAuction(id);
      expect(response).toStrictEqual(auctionMock);
      expect(getAuctionSpy).toHaveBeenCalledTimes(1);
      expect(getAuctionSpy).toHaveBeenCalledWith(id, {});
    });
    it('should return null when auction is not found', async () => {
      const id = 'some unknown id';
      const getAuctionSpy = jest
        .spyOn(repository, 'getAuction')
        .mockResolvedValueOnce(null);
      const response = await service.getAuction(id);
      expect(response).toBeNull();
      expect(getAuctionSpy).toHaveBeenCalledTimes(1);
      expect(getAuctionSpy).toHaveBeenCalledWith(id, {});
    });
  });

  describe('getAuctionBids', () => {
    it('should return array of bids, not bidHistory property', async () => {
      const id = 'some id';
      const auctionBidsMock = auctionBids;
      const bidsMock = auctionBidsMock.bidHistory;
      const getAuctionBidsSpy = jest
        .spyOn(repository, 'getAuctionBids')
        .mockResolvedValueOnce(auctionBidsMock);
      const response = await service.getAuctionBids(id);
      expect(response).toEqual<Bid[]>(bidsMock);
    });
    it('should return empty array when no bids found', async () => {
      const id = 'some id';
      const emptyBidsMock = createMock<Auction>({ bidHistory: [] });
      const getAuctionBidsSpy = jest
        .spyOn(repository, 'getAuctionBids')
        .mockResolvedValueOnce(emptyBidsMock);
      const response = await service.getAuctionBids(id);
      expect(response).toEqual<Bid[]>([]);
      expect(getAuctionBidsSpy).toHaveBeenCalledTimes(1);
      expect(getAuctionBidsSpy).toHaveBeenCalledWith(id);
    });
    it('should return null when auction is not found', async () => {
      const id = 'some unknown id';
      const getAuctionBidsSpy = jest
        .spyOn(repository, 'getAuctionBids')
        .mockResolvedValueOnce(null);
      const response = await service.getAuctionBids(id);
      expect(response).toBeNull();
      expect(getAuctionBidsSpy).toHaveBeenCalledTimes(1);
      expect(getAuctionBidsSpy).toHaveBeenCalledWith(id);
    });
  });

  describe('deleteAuction', () => {
    it('should return deleted auction', async () => {
      const auctionMock = auction;
      const id = 'some id';
      auctionMock._id = id;
      const deleteAuctionSpy = jest
        .spyOn(repository, 'deleteAuction')
        .mockResolvedValueOnce(auctionMock);
      const response = await service.deleteAuction(id);
      expect(response).toStrictEqual(auctionMock);
      expect(deleteAuctionSpy).toHaveBeenCalledTimes(1);
      expect(deleteAuctionSpy).toHaveBeenCalledWith(id);
    });
    it('should return null when auction was not found', async () => {
      const id = 'some unknown id';
      const deleteAuctionSpy = jest
        .spyOn(repository, 'deleteAuction')
        .mockResolvedValueOnce(null);
      const response = await service.deleteAuction(id);
      expect(response).toBeNull();
      expect(deleteAuctionSpy).toHaveBeenCalledTimes(1);
      expect(deleteAuctionSpy).toHaveBeenCalledWith(id);
    });
  });
});
