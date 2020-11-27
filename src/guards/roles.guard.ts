import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(protected reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const { user } = context.switchToHttp().getRequest();
    return this.matchRoles(roles, user.roles);
  }

  private matchRoles(
    endpointRoles: string[],
    userRoles: string[] = [],
  ): boolean {
    const matchedRoles = endpointRoles.filter((endpointRole) =>
      userRoles.includes(endpointRole),
    );
    return JSON.stringify(endpointRoles) === JSON.stringify(matchedRoles);
  }
}
