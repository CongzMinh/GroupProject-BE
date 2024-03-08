import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CacheModule } from '@nestjs/cache-manager';
import { jwtConfig } from 'src/configs/jwt.config';
import { OtpRepository } from './repositories/otp.respository';
import { UserRepository } from '../user/repositories/user.repository';


@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    CacheModule.register(),
    UserModule,
    PassportModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    OtpRepository,
    UserRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
