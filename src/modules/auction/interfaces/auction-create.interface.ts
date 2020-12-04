export interface IAuctionCreate {
  socketAuctionId: string;
  auctionFounder: string;
  debtsForSale: string[];
  auctionEndTime: Date;
  startingPrice: number;
  buyNowPrice?: number;
}
