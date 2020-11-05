import { Body, Controller, Post, Req, UseGuards, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserDto } from 'src/modules/user/dtos';
import { UserService } from 'src/modules/user/services';
import { RegisterDto } from '../dtos';
import { AuthService } from '../services';
import { LocalAuthGuard } from 'src/guards';
import { ResetPassword } from '../dtos';

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

  @Post('reset-password')
  async resetPassword(@Body() resetPassword: ResetPassword) {
    return await this.userService.resetPasswordRequest(resetPassword.email);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response): Promise<any> {
    console.log('req.user :>> ', req.user);
    const { accessToken, refreshToken } = await this.authService.generateTokens(
      req.user,
    );
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    res.status(200).json(req.user);
  }
}
