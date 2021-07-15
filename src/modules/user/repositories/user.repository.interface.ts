import { IGlobalRepository } from './global.repository.interface';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { IUser } from '../interfaces/user.interface';
import { IMessage } from '../../message/interfaces/message.interface';
import { MessageDto } from '../../message/dto/message.dto';

export interface IUserRepository extends IGlobalRepository<UserEntity> {
   //createUser(user: UserDto);
   //getUser(id:number):Promise<IUser>;
   //getAllUsers():Promise<IUser[]>;
   //updateUser(id:number, user:UserDto):Promise<void>;
   //deleteUser(id:number):Promise<void>;
}
