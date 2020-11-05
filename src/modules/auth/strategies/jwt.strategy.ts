import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services';
import { UserService } from 'src/modules/user/services';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: (req: any) => {
        console.log('\njwtFromRequest');
        let token = authService.jwtCookieExtractor(req, 'access_token');
        try {
          authService.validateTokenSync(token);
        } catch (err) {
          if (err instanceof TokenExpiredError) {
            token = authService.jwtCookieExtractor(req, 'refresh_token');
          } else {
            throw err;
          }
        }
        return token;
      },
      // jwtFromRequest: authService.getJwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log('\nvalidate');
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}
