import { Injectable } from '@nestjs/common';
import { PaginateResult, PaginateOptions } from 'mongoose';
import { Debt } from '../schemas';
import { DebtRepository } from '../repositories';
import { DebtCreateDto } from 'modules/debt/dtos';

@Injectable()
export class DebtService {
  constructor(private debtRepository: DebtRepository) {}

  async createDebt(debt: DebtCreateDto): Promise<Debt> {
    return this.debtRepository.createDebt(debt);
  }

  async getPaginatedDebts(
    options: PaginateOptions = {},
    filterParams: any = {},
  ): Promise<PaginateResult<Debt>> {
    return this.debtRepository.getPaginatedDebts(options);
  }

  async getDebt(id: string, options: PaginateOptions = {}): Promise<Debt> {
    return await this.debtRepository.getDebt(id, options);
  }
}
