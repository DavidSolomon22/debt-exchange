import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'guards';
import { DebtCreateDto } from 'modules/debt/dtos';
import { DebtService } from 'modules/debt/services';

@Controller('debts')
@UseGuards(JwtAuthGuard)
export class DebtController {
  constructor(private debtService: DebtService) {}

  @Post()
  async createDebt(@Body() createDebtDto: DebtCreateDto) {
    return await this.debtService.createDebt(createDebtDto);
  }
}
