import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response,Request } from 'express';
import { UserDto } from 'src/modules/user/dtos';
import { UserService } from 'src/modules/user/services';
import { RegisterDto } from '../dtos';
import { AuthService } from '../services';
import { LocalAuthGuard } from 'src/guards';

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { access_token } = await this.authService.loginUser(req.user);
    res.cookie('jwt', access_token, { httpOnly: true });
    res.status(200).json(req.user);
  }
}
