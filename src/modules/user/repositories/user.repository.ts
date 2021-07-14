import {
  createQueryBuilder, EntityRepository, getConnection, QueryBuilder, Repository,
} from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dto/user.dto';
import { IUserRepository } from './user.repository.interface';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> implements IUserRepository {
  async createUser(user: UserDto) {
    const createdUser = await getConnection().createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([{
        first_name: user.first_name, last_name: user.last_name, email: user.email, password: user.password,
      }])
      .execute();
  }

  async getUser(id:number):Promise<IUser> {
    const user = await getConnection().createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where('user.id=:id', { id })
      .getOne();
    return user;
  }

  async getAllUsers():Promise<IUser[]> {
    const users = await getConnection().createQueryBuilder()
      .from(UserEntity, 'user')
      .getRawMany();
    return users;
  }

  async updateUser(id:number, user:UserDto):Promise<void> {
    const updatedUser = await getConnection().createQueryBuilder()
      .update(UserEntity)
      .set({
        first_name: user.first_name, last_name: user.last_name, email: user.email, password: user.password,
      })
      .execute();
  }

  async deleteUser(id:number):Promise<void> {
    await getConnection().createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('id=:id', { id })
      .execute();
  }
}
