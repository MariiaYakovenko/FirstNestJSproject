import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './models/user.dto';
import { IUser } from './models/user.interface';
import { isBuffer } from 'util';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository:Repository<UserEntity>
    ){}


    async createUser(user:UserDTO):Promise<IUser> {
        return this.usersRepository.save(user);
    }

    async readUser(id:number):Promise<IUser>{
        console.log(id);
        try{
            return this.usersRepository.findOne(id);
        }
        catch{
            let usernull:UserDTO;
            return usernull;
        }
    }

    async readAllUsers():Promise<IUser[]>{
        try {
            return this.usersRepository.find();
        }
        catch{
            
        }

    }
    

    //async updateUser(id:string):Promise<IUser>{
      //  return this.usersRepository.update();
    //}
}
