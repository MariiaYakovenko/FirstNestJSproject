import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './models/user.dto';
import { IUser } from './models/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository:Repository<UserEntity>
    ){}


    async createPost(user:UserDTO):Promise<IUser> {
        return this.usersRepository.save(user);
    }
}
