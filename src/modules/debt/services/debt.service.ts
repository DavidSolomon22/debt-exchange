import { Injectable } from '@nestjs/common';
import { PaginateResult, PaginateOptions } from 'mongoose';
import { Debt } from '../schemas';
import { DebtRepository } from '../repositories';
import { DebtCreateDto, DebtUpdateDto } from 'modules/debt/dtos';

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
    return this.debtRepository.getDebt(id, options);
  }

  async updateDebt(
    id: string,
    debt: DebtUpdateDto,
    options: PaginateOptions = {},
  ): Promise<Debt> {
    return this.debtRepository.updateDebt(id, debt, options);
  }

  async deleteDebt(id: string): Promise<Debt> {
    return this.debtRepository.deleteDebt(id);
  }
}
