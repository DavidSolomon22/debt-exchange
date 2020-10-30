import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user';
import { UserService } from '../user/services';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    // JwtModule.register({
    //   secret: 'someSecret',
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
  controllers: [AuthController],
  exports: [],
  providers: [AuthService, UserService, LocalStrategy],
})
export class AuthModule {}
