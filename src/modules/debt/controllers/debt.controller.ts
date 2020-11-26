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
} from '@nestjs/common';
import { JwtAuthGuard } from 'guards';
import { DebtCreateDto } from 'modules/debt/dtos';
import { DebtService } from 'modules/debt/services';
import { ParseSortParamsPipe } from 'pipes';

@Controller('debts')
@UseGuards(JwtAuthGuard)
export class DebtController {
  constructor(private debtService: DebtService) {}

  @Post()
  async createDebt(@Body() createDebtDto: DebtCreateDto) {
    return await this.debtService.createDebt(createDebtDto);
  }

  @Get()
  async getDebts(
    @Query('pageNumber', new DefaultValuePipe(1), ParseIntPipe)
    pageNumber?: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe)
    pageSize?: number,
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe)
    fields?: string[],
    @Query('populates', new DefaultValuePipe([]), ParseArrayPipe)
    populates?: string[], // check on real populate
    @Query(
      'orderBy',
      new DefaultValuePipe([]),
      ParseArrayPipe,
      new ParseSortParamsPipe(),
    )
    orderBy?: string,
  ) {
    const options = {
      page: pageNumber,
      limit: pageSize,
      select: fields,
      populate: populates,
      sort: orderBy,
    };
    return await this.debtService.getPaginatedDebts(options);
  }
}
