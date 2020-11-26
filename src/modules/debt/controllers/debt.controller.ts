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
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { JwtAuthGuard } from 'guards';
import { DebtCreateDto } from 'modules/debt/dtos';
import { Debt } from 'modules/debt/schemas';
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

  @Get(':id')
  async getDebt(
    @Param('id') id: string,
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe)
    fields?: string[],
    @Query('populates', new DefaultValuePipe([]), ParseArrayPipe)
    populates?: string[], // check on real populate
  ) {
    const options = {
      select: fields,
      populate: populates,
    };
    const debt = await this.debtService.getDebt(id, options);
    if (!debt) {
      throw new NotFoundException();
    } else {
      return debt;
    }
  }
}
