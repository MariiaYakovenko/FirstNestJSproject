import {
  CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { configService } from '../../../shared/config/config.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.headers.refreshtoken) {
      const token = (req.headers.refreshtoken as string);
      try {
        await jwt.verify(token, configService.getJwtSecret(true));
      } catch {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      return true;
    }
  }
}
