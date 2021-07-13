import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { IUser } from 'src/users/models/user.interface';
import { UserDto } from '../users/models/user.dto';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createUser(user: UserDto): Promise<IUser> {
    return this.save(user);
  }

  async getUser(id: number): Promise<IUser> {
    return this.findOne(id);
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.find();
  }

  async updateUser(id: number, user: UserDto): Promise<IUser> {
    await this.update(id, user);
    return this.findOne(id);
  }

  async deleteUser(id: number): Promise<boolean> {
    let isUserDeleted = false;
    const countBeforeDeleting = await this.count();
    await this.delete(id);
    const countAfterDeleting = await this.count();
    if (countBeforeDeleting > countAfterDeleting) {
      isUserDeleted = true;
    }
    return isUserDeleted;
  }
}
