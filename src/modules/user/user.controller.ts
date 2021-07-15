import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  HttpException,
  Delete,
  HttpStatus, HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

   @Post()
   @HttpCode(201)
  async createUser(@Body() user: UserDto): Promise<IUser> {
    return this.userService.createUser(user);
  }

  @Get('get/:id')
  @HttpCode(200)
   async getUser(@Param('id') id: number): Promise<IUser> {
     return this.userService.getUser(id);
   }

   @Get('all')
   @HttpCode(200)
  async getAllUsers(): Promise<IUser[]> {
    return this.userService.getAllUsers();
  }

   @Put('update/:id')
   @HttpCode(200)
   async updateUser(
     @Param('id') id: number,
     @Body() user: UserDto,
   ): Promise<IUser> {
     const updatedUser = this.userService.updateUser(id, user);
     if (updatedUser) {
       return updatedUser;
     }

     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
   }

   @Delete('delete/:id')
   @HttpCode(200)
   async deleteUser(@Param('id') id: number): Promise<void> {
     await this.userService.deleteUser(id);
   }
}
