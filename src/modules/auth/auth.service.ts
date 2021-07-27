import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as randomToken from 'rand-token';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/repositories/user.repository';
import { LoginUserType } from '../user/types/login.user.type';
import { IUser } from '../user/interfaces/user.interface';
import { CreateUserType } from '../user/types/create.user.type';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { configService } from '../../shared/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async generateJwt(user: IUser): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  // async setCurrentRefreshToken(refreshToken: string, userId: number) {
  //   const currentRefreshToken = await bcrypt.hash(refreshToken, 10);
  // }

  // private _refreshOptions: IJwtOptions = {
  //   expiresIn: configService.getJwtExpiration(true),
  //   secret: configService.getJwtSecret(true),
  // };
  // get refreshOptions(): IJwtOptions {
  //   return this._refreshOptions;
  // }
  //
  // public async getRefreshedToken(id: number): Promise<string> {
  //   const payload: JwtPayloadDto = { id };
  //   const token = this.jwtService.signAsync(payload, {
  //     secret: this.configService.get(configService.getJwtSecret()),
  //     expiresIn: `${this.configService.get(configService.getJwtExpiration())}`,
  //   });
  //   return token;
  // }

  async createUser(user: CreateUserType): Promise<IUser> {
    const userFromDb = await this.userRepository.findOne({ email: user.email });
    if (userFromDb) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    const token = await this.generateJwt(userFromDb);
    user.password = await bcrypt.hash(user.password, 12);
    await this.userRepository.save(user);
    const createdUser = await this.userRepository.findOne({ email: user.email });
    createdUser.token = token;
    return this.userRepository.save(createdUser);
  }

  async login(user: LoginUserType): Promise<IUser> {
    const userFromDb = await this.userRepository.getUserWithPsswordByEmail(user.email);
    if (!userFromDb) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const result = await bcrypt.compare(user.password, userFromDb.password);
    if (!result) throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    const token = await this.generateJwt(userFromDb);
    userFromDb.token = token;
    await this.userRepository.save(userFromDb);
    return this.userRepository.findOne({ email: user.email });
  }
}
