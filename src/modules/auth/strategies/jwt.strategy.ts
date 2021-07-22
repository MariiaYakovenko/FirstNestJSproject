import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { UserDto } from '../../user/dto/user.dto';
import { UserRepository } from '../../user/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<UserDto> {
    return this.userRepository.findOne(payload.id);
  }
}
