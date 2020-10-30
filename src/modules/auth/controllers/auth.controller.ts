import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/modules/user/dtos';
import { UserService } from 'src/modules/user/services';
import { RegisterDto } from '../dtos';
import { AuthService } from '../services';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    return await this.authService.registerUser(registerDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.loginUser(req.user);
  }
}
