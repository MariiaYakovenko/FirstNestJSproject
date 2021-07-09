import { Injectable, HttpService } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './models/create.user.dto';
import { IUser } from './models/user.interface';
import { isBuffer } from 'util';
import { UpdateUserDTO } from './models/update.user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository:Repository<UserEntity>
    ){}


    async createUser(user:CreateUserDTO):Promise<IUser> {
        return this.usersRepository.save(user);
    }

    async readUser(id:number):Promise<IUser>{
        try{
            return this.usersRepository.findOne(id);
        }
        catch{
            let usernull:UserEntity;
            return usernull;
        }
    }

    async readAllUsers():Promise<IUser[]>{
        try {
            return this.usersRepository.find();
        }
        catch{
            let usersnull:Promise<IUser[]>;
            return usersnull;
        }
    }
    
     async updateUser(id:number, user:UpdateUserDTO):Promise<IUser>{
         try { 
              this.usersRepository.update(id, user);
        }
        catch{
                let usernull:Promise<IUser>;
                return usernull;
        }
        return this.readUser(id);
    }


    async deleteUser(id:number):Promise<DeleteResult> {
            return this.usersRepository.delete(id);
         }
}
