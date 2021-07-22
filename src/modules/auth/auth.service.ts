import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';
import { LoginUserType } from '../user/types/login.user.type';
import { IUser } from '../user/interfaces/user.interface';
import { CreateUserType } from '../user/types/create.user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async generateJwt(user: IUser): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  async createUser(user: CreateUserType): Promise<IUser> {
    const userFromDb = await this.userRepository.getUserByEmail(user.email);
    if (userFromDb) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    user.password = await bcrypt.hash(user.password, 12);
    return this.userRepository.save(user);
  }

  async login(user: LoginUserType): Promise<string> {
    const userFromDb = await this.userRepository.getUserByEmail(user.email);
    if (!userFromDb) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const result = await bcrypt.compare(user.password, userFromDb.password);
    if (!result) throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    return this.generateJwt(userFromDb);
  }
}
