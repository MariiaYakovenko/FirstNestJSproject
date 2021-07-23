import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interface';
import { CreateUserType } from './types/create.user.type';
import { UpdateUserType } from './types/update.user.type';
import { PaginationQueryParamsType } from '../../shared/types/pagination-query-params.type';
import { assignObjects } from '../../shared/assign_objects/assign-objects.helper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getUser(id: number): Promise<IUser> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async getAllUsers(paginationParams: PaginationQueryParamsType): Promise<IUser[]> {
    const users = await this.userRepository.find({
      skip: ((paginationParams.page - 1) * paginationParams.per_page),
      take: paginationParams.per_page,
    });
    if (!users.length) throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    return users;
  }

  async updateUser(id: number, user: UpdateUserType): Promise<IUser> {
    const updatedUser = await this.userRepository.findOne(id);
    if (!updatedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    user.password = await bcrypt.hash(user.password, 12);
    assignObjects(updatedUser, user);
    await this.userRepository.save(updatedUser);
    return this.userRepository.findOne(id);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (!result.affected) throw new HttpException('User to be deleted not found', HttpStatus.NOT_FOUND);
  }
}
