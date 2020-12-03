import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class AuctionCreateDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ArrayUnique()
  debtsForSale: string[];

  @IsNotEmpty()
  @IsDate()
  auctionEndTime: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  startingPrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  buyNowPrice?: number;
}
