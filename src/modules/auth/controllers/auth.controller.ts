import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserDto } from 'modules/user/dtos';
import { RegisterDto } from 'modules/auth/dtos';
import { AuthService } from 'modules/auth/services';
import { LocalAuthGuard } from 'guards';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async test() {
    return 'test';
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    const user = await this.authService.registerUser(registerDto);
    const userDto = plainToClass(UserDto, user.toObject(), {
      enableImplicitConversion: true,
    });
    return userDto;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response): Promise<any> {
    const { accessToken, refreshToken } = await this.authService.generateTokens(
      req.user,
    );
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    res.status(200).json(req.user);
  }
}
