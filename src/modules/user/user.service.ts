import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: CreateUserDto): Promise<IUser> {
    return this.userRepository.save(user);
  }

  async getUser(id: number): Promise<IUser> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.userRepository.find();
    if (users) {
      return users;
    }
    throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<IUser> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.getUser(id);
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
