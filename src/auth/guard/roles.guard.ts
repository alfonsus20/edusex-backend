import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { UserRole } from '../../enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private role: UserRole) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    return user['role'] === this.role;
  }
}
