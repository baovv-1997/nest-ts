import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Role } from 'common/schemas/user.schema';
import { IDataSign } from 'common/types/dataSign.type';
import { buildFailedResponse } from 'core/response/index.response';
import { Observable } from 'rxjs';
import { verifyData } from 'utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const authorizationKey = 'Bearer';
      let token = request.headers?.authorization;

      if (token) {
        try {
          if (token.startsWith(authorizationKey)) {
            token = token.slice(authorizationKey.length, token.length, token).trim();
          }

          const payload = verifyData<IDataSign>(token);
          request.user = payload;
          
          return true;
        } catch (e) {
          if (e.name === 'TokenExpiredError') {
            throw new HttpException(buildFailedResponse({ statusCode: HttpStatus.PAYMENT_REQUIRED, message: 'TokenExpiredError' }), HttpStatus.PAYMENT_REQUIRED);
          }
          throw new HttpException(buildFailedResponse({ statusCode: HttpStatus.UNAUTHORIZED }), HttpStatus.UNAUTHORIZED);
        }
      }

      throw new HttpException(buildFailedResponse({ statusCode: HttpStatus.UNAUTHORIZED }), HttpStatus.UNAUTHORIZED);
    } catch (ex) {
      console.log('e---', ex);
      throw ex;
    }
  }
}
