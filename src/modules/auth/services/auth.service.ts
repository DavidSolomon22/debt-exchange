import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/services';
import { RegisterDto } from '../dtos';
import { UserCreateDto, UserDto } from 'src/modules/user/dtos';
import { hash, compare } from 'bcrypt';
import { User } from 'src/modules/user/schemas';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getOneByEmailWithHash(email);
    if (user && (await compare(password, user.passwordHash))) {
      delete user.passwordHash;
      return user;
    }
    return null;
  }

  async loginUser(user: any) {
    const { _id, email } = user;
    const payload = { sub: _id, email: email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(user: RegisterDto): Promise<UserDto> {
    const { password } = user;
    const passwordHash = await hash(password, 10);
    let userForCreation = new UserCreateDto();
    userForCreation = { ...user, passwordHash };
    return await this.userService.createUser(userForCreation);
  }

  jwtCookieExtractor(req: any) {
    let token = null;
    if (req && req.headers && req.headers.cookie) {
      token = req.headers.cookie.split('jwt=')[1];
    }
    return token;
  }
}
