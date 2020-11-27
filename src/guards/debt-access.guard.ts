import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DebtService } from 'modules/debt/services';
import { RolesGuard } from './roles.guard';

@Injectable()
export class DebtAccessGuard extends RolesGuard implements CanActivate {
  constructor(
    protected reflector: Reflector,
    private debtService: DebtService,
  ) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      user: { userId },
      params: { id },
    } = context.switchToHttp().getRequest();

    const debt = await this.debtService.getDebt(id);

    return debt && this.checkIfDebtOwner(debt, userId)
      ? true
      : await super.canActivate(context);
  }

  private checkIfDebtOwner(debt, userId: string): boolean {
    return debt.owner === userId;
  }
}
