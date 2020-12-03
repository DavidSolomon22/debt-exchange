import { Test, TestingModule } from '@nestjs/testing';
import { PaginateModel } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import {
  createEmptyPaginatedResultMock,
  mongooseUpdateOptions,
} from 'common/mocks';
import { DocumentQuery } from 'mongoose';
import { Auction } from '../schemas';
import { AuctionRepository } from '.';
import {
  newAuction,
  iAuctionCreate,
  newBid,
  iBidCreate,
  auctionId,
  paginatedAuctions,
  bids,
  auctionBids,
} from '../mocks';
import { createMock } from '@golevelup/ts-jest';

describe('AuctionRepository', () => {
  let repository: AuctionRepository;
  let model: PaginateModel<Auction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuctionRepository,
        {
          provide: getModelToken('Auction'),
          useValue: {
            create: jest.fn(),
            paginate: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<AuctionRepository>(AuctionRepository);
    model = module.get<PaginateModel<Auction>>(getModelToken('Auction'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('model should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('createAuction', () => {
    it('should return created auction', async () => {
      const iAuctionCreateMock = iAuctionCreate;
      const newAuctionMock = newAuction;
      const createSpy = jest
        .spyOn(model, 'create')
        .mockResolvedValue(newAuctionMock);
      const response = await repository.createAuction(iAuctionCreateMock);
      expect(response).toBeDefined();
      expect(response).toStrictEqual(newAuctionMock);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(iAuctionCreateMock);
    });
  });

  describe('createBid', () => {
    it('should return created bid', async () => {
      const iBidCreateMock = iBidCreate;
      const newBidMock = newBid;
      const findByIdAndUpdateSpy = jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValueOnce(
          createMock<DocumentQuery<Auction, Auction, unknown>>({
            select: () => ({
              lean: jest.fn().mockResolvedValueOnce(newBidMock),
            }),
          }),
        );
      const response = await repository.createBid(auctionId, iBidCreateMock);
      expect(response).toBeDefined();
      expect(response).toStrictEqual(newBidMock);
      expect(findByIdAndUpdateSpy).toHaveBeenCalledTimes(1);
      expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(
        auctionId,
        {
          $push: { bidHistory: iBidCreateMock },
        },
        mongooseUpdateOptions,
      );
    });
  });

  describe('getPaginatedAuctions', () => {
    it('should return paginated auctions', async () => {
      const paginatedAuctionsMock = paginatedAuctions;
      const paginateSpy = jest
        .spyOn(model, 'paginate')
        .mockResolvedValue(paginatedAuctionsMock);
      const response = await repository.getPaginatedAuctions();
      expect(response).toBeDefined();
      expect(response).toStrictEqual(paginatedAuctionsMock);
      expect(paginateSpy).toHaveBeenCalledTimes(1);
    });
    it('should return empty docs array if auctions collection is empty', async () => {
      const emptyPaginatedResult = createEmptyPaginatedResultMock<Auction>();
      jest.spyOn(model, 'paginate').mockResolvedValue(emptyPaginatedResult);
      const response = await repository.getPaginatedAuctions();
      expect(response).toStrictEqual(emptyPaginatedResult);
    });
  });

  describe('getAuction', () => {
    it('should return one auction', async () => {
      const auctionMock = newAuction;
      const id = 'some id';
      auctionMock._id = id;
      const findByIdSpy = jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<DocumentQuery<Auction, Auction, unknown>>({
          select: () => ({
            populate: () => ({
              lean: jest.fn().mockResolvedValueOnce(auctionMock),
            }),
          }),
        }),
      );
      const response = await repository.getAuction(id);
      expect(response).toStrictEqual(auctionMock);
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith(id);
    });
    it('should return null when auction is not found', async () => {
      const id = 'some unknown id';
      const findByIdSpy = jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<DocumentQuery<Auction, Auction, unknown>>({
          select: () => ({
            populate: () => ({
              lean: jest.fn().mockResolvedValueOnce(null),
            }),
          }),
        }),
      );
      const response = await repository.getAuction(id);
      expect(response).toBeNull();
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith(id);
    });
  });

  describe('getAuctionBids', () => {
    it('should return array of all auction bids', async () => {
      // idk how to check what param was passed to chain function
      // for example i would like to check that select was invoked only with 'bidhistory' param
      const auctionBidsMock = auctionBids;
      const findByIdSpy = jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<DocumentQuery<Auction, Auction, unknown>>({
          select: () => ({
            lean: jest.fn().mockResolvedValueOnce(auctionBidsMock),
          }),
        }),
      );
      const response = await repository.getAuctionBids(auctionId);
      expect(response).toBeDefined();
      expect(response).toStrictEqual(auctionBidsMock);
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith(auctionId);
    });
    it('should return empty array when auction has no bids', async () => {
      const findByIdSpy = jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<DocumentQuery<Auction, Auction, unknown>>({
          select: () => ({
            lean: jest.fn().mockResolvedValueOnce([]),
          }),
        }),
      );
      const response = await repository.getAuctionBids(auctionId);
      expect(response).toBeDefined();
      expect(response).toStrictEqual([]);
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith(auctionId);
    });
    it('should return null when auction is not found', async () => {
      const id = 'some unknown id';
      const findByIdSpy = jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<DocumentQuery<Auction, Auction, unknown>>({
          select: () => ({
            lean: jest.fn().mockResolvedValueOnce(null),
          }),
        }),
      );
      const response = await repository.getAuctionBids(id);
      expect(response).toBeNull();
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith(id);
    });
  });

  describe('deleteAuction', () => {
    it('should return deleted auction', async () => {
      const auctionMock = newAuction;
      const id = 'some id';
      auctionMock._id = id;
      const findByIdAndDeleteSpy = jest
        .spyOn(model, 'findByIdAndDelete')
        .mockResolvedValueOnce(auctionMock);
      const response = await repository.deleteAuction(id);
      expect(response).toStrictEqual(auctionMock);
      expect(findByIdAndDeleteSpy).toHaveBeenCalledTimes(1);
      expect(findByIdAndDeleteSpy).toHaveBeenCalledWith(id);
    });
    it('should return null when auction was not found', async () => {
      const id = 'some unknown id';
      const findByIdAndDeleteSpy = jest
        .spyOn(model, 'findByIdAndDelete')
        .mockResolvedValueOnce(null);
      const response = await repository.deleteAuction(id);
      expect(response).toBeNull();
      expect(findByIdAndDeleteSpy).toHaveBeenCalledTimes(1);
      expect(findByIdAndDeleteSpy).toHaveBeenCalledWith(id);
    });
  });
});
