import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Role } from 'common/schemas/user.schema';
import { buildFailedResponse } from 'core/response/index.response';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private role: Role[]) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();

    if(this.role.includes(user?.role)) {
      return true;
    }

    throw new HttpException(buildFailedResponse({ statusCode: HttpStatus.FORBIDDEN }), HttpStatus.FORBIDDEN);
  }
}
