import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/repositories/user.repository';
import { AuthController } from './auth.controller';
import { configService } from '../../shared/config/config.service';
import { JwtAccessStrategy } from './strategies/jwt.access-strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [JwtModule.register({
    secret: configService.getJwtSecret(),
    signOptions: { expiresIn: configService.getJwtExpiration() },
  }), TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService, PassportModule, JwtAccessStrategy, JwtAuthGuard],
})
export class AuthModule {}
