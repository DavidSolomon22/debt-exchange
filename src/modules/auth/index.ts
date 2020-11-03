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
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'someSecret',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  exports: [],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
