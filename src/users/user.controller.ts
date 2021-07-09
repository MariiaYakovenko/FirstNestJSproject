import { Controller, Post, HttpCode, Body, Put, Param, Get, HttpException, BadRequestException, Delete, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './models/create.user.dto';
import { IUser } from './models/user.interface';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UpdateUserDTO } from './models/update.user.dto';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @Post()
    async create(@Body() user:CreateUserDTO): Promise<IUser> {
        return this.userService.createUser(user);
    }

    @Get('get/:id')
    async read(@Param('id') id:number):Promise<IUser> {
        let user=this.userService.readUser(id);
        if(user!=null) {
            return user;
        }
        else {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get('all')
    async readAll():Promise<IUser[]>{
        let users=this.userService.readAllUsers();
        if(users!=null) {
            return users;
        }
        else {
            throw new HttpException("Users not found", HttpStatus.NOT_FOUND);
        }
    }
   
    @Put('update/:id')
    async update(@Param('id') id:number, @Body() user:UpdateUserDTO):Promise<IUser> {
        let updatedUser=this.userService.updateUser(id, user);
        if(updatedUser!=null) {
            return updatedUser;
        }
        else {
            throw new HttpException("Users not found", HttpStatus.NOT_FOUND);
        }   
    }  


    @Delete('delete/:id')
    async delete(@Param('id') id:number):Promise<DeleteResult>{
        return this.userService.deleteUser(id);
    }
   
}

//promise for async (await используется только при присваивании и return без значения) (conditions: fulfilled\rejected) 
//настроить\подключить linter