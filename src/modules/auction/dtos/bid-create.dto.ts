import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class BidCreateDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  bidPrice: number;
}
