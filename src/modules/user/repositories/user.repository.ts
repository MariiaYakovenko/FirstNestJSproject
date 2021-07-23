import {
  EntityRepository, Repository,
} from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { IUserRepository } from './user.repository.interface';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> implements IUserRepository {
  async getUserByEmail(email:string):Promise<IUser> {
    return this.createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where('user.email=:email', { email })
      .getOne();
  }
}
