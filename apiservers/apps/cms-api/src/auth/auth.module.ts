import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from '@libs/common/repository/admin.repository';
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt'
import { JwtConfigService } from './config/jwt.config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRepository]),
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
