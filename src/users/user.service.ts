import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from './models/user.interface';
import { UsersRepository } from 'src/repository/repository.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async createUser(user: userType): Promise<IUser> {
      return await this.usersRepository.createUser(user);
  }

  async getUser(id: number): Promise<IUser> {
      return await this.usersRepository.getUser(id);
  }

  async getAllUsers(): Promise<IUser[]> {
      return await this.usersRepository.getAllUsers();
  }

  async updateUser(id: number, user: userType): Promise<IUser> {
      return await this.usersRepository.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
      return await this.usersRepository.deleteUser(id);
  }

}
