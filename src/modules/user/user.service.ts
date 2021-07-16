import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { ParamDto } from '../../shared/dto/param.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: CreateUserDto): Promise<IUser> {
    const userFromDb = await this.userRepository.checkUserByEmail(user.email);
    if (userFromDb) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    return this.userRepository.save(user);
  }

  async getUser(id: ParamDto): Promise<IUser> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.userRepository.find();
    if (!users) throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    return users;
  }

  async updateUser(id: ParamDto, user: UpdateUserDto): Promise<IUser> {
    const updatedUser = await this.userRepository.findOne(id);
    if (!updatedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    updatedUser.first_name = user.first_name;
    updatedUser.last_name = user.last_name;
    updatedUser.email = user.email;
    updatedUser.password = user.password;
    await this.userRepository.save(updatedUser);
    return this.userRepository.findOne(id);
  }

  async deleteUser(id: ParamDto): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new HttpException('User to be deleted not found', HttpStatus.NOT_FOUND);
  }
}
