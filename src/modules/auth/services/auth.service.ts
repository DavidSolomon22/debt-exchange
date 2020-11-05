import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services';
import { RegisterDto } from '../dtos';
import { UserCreateDto, UserDto } from 'src/modules/user/dtos';
import { hash, compare } from 'bcrypt';
import { User } from 'src/modules/user/schemas';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from 'src/utils/services';
import { TokenExpiredError } from 'jsonwebtoken';

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

  validateTokenSync(token: string): any {
    return this.jwtService.verify(token, {
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
        expiresIn: '5s',
      }),
      refreshToken: this.jwtService.sign(refreshTokenPayload, {
        expiresIn: '10s',
      }),
    };
  }

  async registerUser(user: RegisterDto): Promise<UserDto> {
    const { password } = user;
    const passwordHash = await hash(password, 10);
    let userForCreation = new UserCreateDto();
    userForCreation = { ...user, passwordHash };
    return await this.userService.createUser(userForCreation);
  }

  jwtCookieExtractor(req: any, cookieName: string): string {
    // console.log('\njwtCookieExtractor');
    let token = null;
    if (req && req.headers && req.headers.cookie) {
      token = UtilsService.getCookie(req.headers.cookie, cookieName);
    }
    return token;
  }
}
