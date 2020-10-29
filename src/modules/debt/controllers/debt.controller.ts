import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  ParseArrayPipe,
  UseGuards,
} from '@nestjs/common';
import { DebtRepository } from '../repositories';
import { DebtService } from '../services';
import { DebtCreateDto } from '../dtos';
import { DebtUpdateDto } from '../dtos/debt-update.dto';
import { ParseSortParamsPipe } from 'src/pipes';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('Debts')
@UseGuards(RolesGuard)
export class DebtController {
  constructor(private debtRepository: DebtRepository, private debtService: DebtService) {}

  @Post()
  async createDebt(@Body() createDebtDto: DebtCreateDto) {
    return await this.debtRepository.createDebt(createDebtDto);
  }

  @Get()
  @Roles('admin')
  async getDebts(
    @Query('pageNumber', new DefaultValuePipe(1), ParseIntPipe)
    pageNumber: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe)
    pageSize: number,
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe)
    fields: string[],
    @Query('populates', new DefaultValuePipe([]), ParseArrayPipe)
    populates: string[], // check on real populate
    @Query(
      'orderBy',
      new DefaultValuePipe([]),
      ParseArrayPipe,
      new ParseSortParamsPipe(),
    )
    orderBy: string,
  ) {
    const options = {
      page: pageNumber,
      limit: pageSize,
      select: fields,
      populate: populates,
      sort: orderBy,
    };
    return await this.debtService.getPaginatedDebts(options)
  }

  @Get(':id')
  async getDebt(
    @Param('id') id: string,
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe)
    fields: string[],
    @Query('populates', new DefaultValuePipe([]), ParseArrayPipe)
    populates: string[], // check on real populate
  ) {
    const options = {
      select: fields,
      populate: populates,
    };
    const debt = await this.debtRepository.getDebt(id, options);
    if (!debt) {
      throw new NotFoundException();
    } else {
      return debt;
    }
  }

  @Patch(':id')
  async updateDebt(
    @Param('id') id: string,
    @Query('fields', new DefaultValuePipe([]), ParseArrayPipe)
    fields: string[],
    @Query('populates', new DefaultValuePipe([]), ParseArrayPipe)
    populates: string[], // check on real populate
    @Body() debtUpdateDto: DebtUpdateDto,
  ) {
    const options = {
      select: fields,
      populate: populates,
    };
    const debt = await this.debtRepository.updateDebt(
      id,
      debtUpdateDto,
      options,
    );
    if (!debt) {
      throw new NotFoundException();
    } else {
      return debt;
    }
  }

  @Delete(':id')
  async deleteDebt(@Param('id') id: string) {
    const debt = await this.debtRepository.deleteDebt(id);
    if (!debt) {
      throw new NotFoundException();
    } else {
      return debt;
    }
  }
}
