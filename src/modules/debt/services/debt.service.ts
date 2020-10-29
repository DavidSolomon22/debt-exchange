import { Injectable } from '@nestjs/common';
import { PaginateResult, PaginateOptions } from 'mongoose';
import { Debt } from '../models';
import { DebtRepository } from '../repositories';

@Injectable()
export class DebtService {
  constructor(private debtRepository: DebtRepository) {}

  async getPaginatedDebts(
    options: PaginateOptions,
  ): Promise<PaginateResult<Debt>> {
    return await this.debtRepository.getPaginatedDebts(options);
  }
}
