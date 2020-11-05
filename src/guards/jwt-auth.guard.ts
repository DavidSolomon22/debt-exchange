import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import { AuthService } from 'src/modules/auth/services';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('\ncanActivate');

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const accessToken = this.authService.jwtCookieExtractor(
      req,
      'access_token',
    );
    if (!accessToken) {
      throw new UnauthorizedException('access_token was not provided'); // clear cookies
    }
    try {
      await this.authService.validateToken(accessToken); // clear cookies when not valid
      return this.activate(context);
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        const refreshToken = this.authService.jwtCookieExtractor(
          req,
          'refresh_token',
        );
        if (!refreshToken) {
          throw new UnauthorizedException('refresh_token was not provided'); // clear cookies
        }
        const refreshTokenPayload = await this.authService.validateToken(
          refreshToken,
        ); // clear cookies when not valid and clear cookies when expired
        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        } = await this.authService.generateTokens(refreshTokenPayload);

        console.log('newAccessToken :>> ', newAccessToken);
        console.log('newRefreshToken :>> ', newRefreshToken);
        res.cookie('access_token', newAccessToken, { httpOnly: true });
        res.cookie('refresh_token', newRefreshToken, { httpOnly: true });
        return this.activate(context);
      } else {
        throw err;
      }
    }
  }

  async activate(context: ExecutionContext): Promise<boolean> {
    console.log('\nactivate');
    return super.canActivate(context) as Promise<boolean>;
  }
}
