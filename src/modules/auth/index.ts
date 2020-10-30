import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { LocalStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'someSecret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  exports: [],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
