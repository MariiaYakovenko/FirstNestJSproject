import { IGlobalRepository } from '../../../shared/interfaces/global.repository.interface';
import { UserEntity } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';

export interface IUserRepository extends IGlobalRepository<UserEntity> {
  getUserWithPsswordByEmail(email:string):Promise<IUser>;
}
