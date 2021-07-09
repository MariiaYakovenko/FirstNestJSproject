import { Controller, Post, HttpCode, Body, Put, Param, Get, HttpException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './models/user.dto';
import { IUser } from './models/user.interface';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @Post()
    async create(@Body() user:UserDTO): Promise<IUser> {
        return this.userService.createUser(user);
    }


    
   
}

//promise for async (await используется только при присваивании и return без значения) (conditions: fulfilled\rejected) 
//настроить\подключить linter