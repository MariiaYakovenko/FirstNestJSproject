import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';
import { LoginUserType } from '../user/types/login.user.type';
import { IUser } from '../user/interfaces/user.interface';
import { CreateUserType } from '../user/types/create.user.type';
import { configService } from '../../shared/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async generateJwt(id: number): Promise<{accessToken: string, refreshToken: string, expiresAt: Record<string, any>}> {
    const accessToken = await this.jwtService.sign({ id });
    const refreshToken = await this.jwtService.sign({ id }, {
      secret: configService.getJwtSecret(true),
      expiresIn: configService.getJwtExpiration(),
    });
    const expiresAt: Record<string, any> = this.jwtService.decode(accessToken) as Record<string, any>;
    return { accessToken, refreshToken, expiresAt };
  }

  async createUser(user: CreateUserType): Promise<{createdUserFromDb: IUser, accessToken: string, refreshToken: string, expiresAt: Record<string, any>}> {
    const userFromDb = await this.userRepository.findOne({ email: user.email });
    if (userFromDb) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    user.password = await bcrypt.hash(user.password, 12);
    await this.userRepository.save(user);
    const createdUser = await this.userRepository.findOne({ email: user.email });
    const { accessToken, refreshToken, expiresAt } = await this.generateJwt(createdUser.id);
    const createdUserFromDb = await this.userRepository.save(createdUser);
    return {
      createdUserFromDb, accessToken, refreshToken, expiresAt,
    };
  }

  async login(user: LoginUserType): Promise<{confirmedUserFromDb: IUser, accessToken: string, refreshToken: string, expiresAt: Record<string, any>}> {
    const userFromDb = await this.userRepository.getUserWithPsswordByEmail(user.email);
    if (!userFromDb) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const result = await bcrypt.compare(user.password, userFromDb.password);
    if (!result) throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    const { accessToken, refreshToken, expiresAt } = await this.generateJwt(userFromDb.id);
    const confirmedUserFromDb = await this.userRepository.save(userFromDb);
    return {
      confirmedUserFromDb, accessToken, refreshToken, expiresAt,
    };
  }
}
