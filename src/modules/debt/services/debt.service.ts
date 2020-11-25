import { Injectable } from '@nestjs/common';
import { Debt } from '../schemas';
import { DebtRepository } from '../repositories';
import { DebtCreateDto } from 'modules/debt/dtos';

@Injectable()
export class DebtService {
  constructor(private debtRepository: DebtRepository) {}

  async createDebt(debt: DebtCreateDto): Promise<Debt> {
    return this.debtRepository.createDebt(debt);
  }
}
