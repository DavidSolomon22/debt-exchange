import { PaginateModel, PaginateResult, PaginateOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Debt } from '../schemas';
import { DebtCreateDto } from '../dtos';
import { DebtUpdateDto } from '../dtos/debt-update.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class DebtRepository {
  constructor(
    @InjectModel(Debt.name)
    private debtModel: PaginateModel<Debt>,
  ) {}

  async createDebt(debt: DebtCreateDto): Promise<Debt> {
    const createdCat = new this.debtModel(debt);
    return await createdCat.save(); // nie ma zadnej fajnej opcji aby zrobic select i populate, mozna tylko wykonac drugi request do bazy
  }

  // done
  async getAllDebts(): Promise<Debt[]> {
    return await this.debtModel.find().exec();
  }

  // ogarnac populate + parsowanie populate pipe, zeby mozna bylo tworzyc obiekty (dla zagniezdzonych pol)
  async getPaginatedDebts(
    options: PaginateOptions,
    filterQuery: FilterQuery<Debt> = {},
  ): Promise<PaginateResult<Debt>> {
    return await this.debtModel.paginate(filterQuery, options);
  }

  // ogarnac populate
  async getDebt(id: string, options: PaginateOptions): Promise<Debt> {
    const { select, populate } = options;
    let { lean } = options;
    if (lean === undefined || lean === null) {
      lean = true;
    }
    return await this.debtModel
      .findById(id)
      .select(select)
      .populate(populate)
      .lean(lean);
  }

  // ogarnac populate
  async updateDebt(
    id: string,
    debt: DebtUpdateDto,
    options: PaginateOptions,
  ): Promise<Debt> {
    const { select, populate } = options;
    let { lean } = options;
    if (lean === undefined || lean === null) {
      lean = true;
    }
    return await this.debtModel
      .findByIdAndUpdate(id, debt, {
        new: true,
        runValidators: true,
        context: 'query',
      })
      .select(select)
      .populate(populate)
      .lean(lean);
  }

  // done
  async deleteDebt(id: string): Promise<Debt> {
    return await this.debtModel.findByIdAndDelete(id);
  }
}
