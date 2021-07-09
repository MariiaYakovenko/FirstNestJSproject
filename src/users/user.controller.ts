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

    @Get(':id')
    async read(@Param('id') id:number):Promise<IUser>{
        let user=this.userService.readUser(id);
        if(user!=null){
            return user;
        }
        else{
            throw new BadRequestException('can\'t find the user');
        }
    }

    @Get('all')
    async readAll():Promise<IUser[]>{
        return this.userService.readAllUsers();
    }

   // @Put(':id')
    //async update(@Param('id') id:string):Promise<IUser>{

    // return this.userService.updateUser(id);
    //}
    
   
}

//promise for async (await используется только при присваивании и return без значения) (conditions: fulfilled\rejected) 
//настроить\подключить linter