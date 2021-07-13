import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/repository/repository.entity';
import { IUser } from './models/user.interface';
import { UserDto } from './models/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
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
