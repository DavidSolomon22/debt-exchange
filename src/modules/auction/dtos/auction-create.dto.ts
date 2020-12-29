import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDateString,
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
  @IsDateString()
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
