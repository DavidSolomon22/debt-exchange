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

  async registerUser(user: RegisterDto): Promise<UserDto> {
    const { password } = user;
    const passwordHash = await hash(password, 10);
    let userForCreation = new UserCreateDto();
    userForCreation = { ...user, passwordHash };
    return await this.userService.createUser(userForCreation);
  }

  async loginUser(user: any) {
    const payload = { sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getOneByEmail(email);
    if (user && (await compare(password, user.passwordHash))) {
      user.passwordHash === undefined;
      return user;
    }
    return null;
  }
}
