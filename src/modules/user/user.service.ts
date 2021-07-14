import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { IUser } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: UserDto): Promise<IUser> {
    await this.userRepository.createUser(user);
    return this.getUser(user.id);
  }

  async getUser(id: number): Promise<IUser> {
    return this.userRepository.findOne(id);
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.getAllUsers();
  }

  async updateUser(id: number, user: UserDto): Promise<IUser> {
    await this.userRepository.updateUser(id, user);
    return this.getUser(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
