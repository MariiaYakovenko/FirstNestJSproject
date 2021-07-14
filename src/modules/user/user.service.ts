import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { IUser } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
  ) {}

  async createUser(user: UserDto): Promise<IUser> {
    return this.usersRepository.createUser(user);
  }

  async getUser(id: number): Promise<IUser> {
    return this.usersRepository.getUser(id);
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.usersRepository.getAllUsers();
  }

  async updateUser(id: number, user: UserDto): Promise<IUser> {
    return this.usersRepository.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.usersRepository.deleteUser(id);
  }
}
