import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';
import { AuthService } from 'modules/auth/services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const accessToken = this.authService.jwtCookieExtractor(
      req,
      'access_token',
    );
    if (!accessToken) {
      throw new UnauthorizedException('access_token was not provided');
    }
    try {
      const payload = await this.authService.validateToken(accessToken);
      req.user = {
        userId: payload.sub,
        email: payload.email,
        roles: payload.roles,
      };
      return true;
    } catch (accessTokenError) {
      if (accessTokenError instanceof TokenExpiredError) {
        const refreshToken = this.authService.jwtCookieExtractor(
          req,
          'refresh_token',
        );
        if (!refreshToken) {
          throw new UnauthorizedException('refresh_token was not provided');
        }
        try {
          const payload = await this.authService.validateToken(refreshToken);
          const {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          } = await this.authService.generateTokens(payload);
          req.user = {
            userId: payload.sub,
            email: payload.email,
            roles: payload.roles,
          };
          res.cookie('access_token', newAccessToken, { httpOnly: true });
          res.cookie('refresh_token', newRefreshToken, { httpOnly: true });
          return true;
        } catch (refreshTokenError) {
          if (refreshTokenError instanceof TokenExpiredError) {
            throw new TokenExpiredError(
              'refresh_token expired',
              refreshTokenError.expiredAt,
            );
          } else {
            throw refreshTokenError;
          }
        }
      } else {
        throw accessTokenError;
      }
    }
  }
}
