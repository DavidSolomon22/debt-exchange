import { Injectable } from '@nestjs/common';
import { UserService } from 'modules/user/services';
import { RegisterDto } from '../dtos';
import { UserCreateDto, UserDto } from 'modules/user/dtos';
import { hash, compare } from 'bcrypt';
import { User } from 'modules/user/schemas';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from 'utils/services';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getOneByEmailWithHash(email);
    if (user && (await compare(password, user.passwordHash))) {
      delete user.passwordHash;
      return user;
    }
    return null;
  }

  async validateToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      ignoreExpiration: false,
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  async generateTokens(user: any) {
    const { _id, sub, email, roles } = user;
    const accessTokenPayload = { sub: _id || sub, email, roles };
    const refreshTokenPayload = { sub: _id || sub, email, roles };
    return {
      accessToken: this.jwtService.sign(accessTokenPayload, {
        expiresIn: '5m',
      }),
      refreshToken: this.jwtService.sign(refreshTokenPayload, {
        expiresIn: '8h',
      }),
    };
  }

  async registerUser(user: RegisterDto): Promise<User> {
    const { password } = user;
    const passwordHash = await hash(password, 10);
    const userForCreation: UserCreateDto = { ...user, passwordHash };
    return await this.userService.createUser(userForCreation);
  }

  jwtCookieExtractor(req: any, cookieName: string): string {
    let token = null;
    if (req && req.headers && req.headers.cookie) {
      token = UtilsService.getCookie(req.headers.cookie, cookieName);
    }
    return token;
  }
}
