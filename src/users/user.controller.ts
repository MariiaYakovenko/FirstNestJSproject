import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  HttpException,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './models/user.interface';
import { UserDto } from './models/user.dto';
import { CreateUserDto } from './models/create.user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<IUser> {
    return this.userService.createUser(user);
  }

  @Get('get/:id')
  async getUser(@Param('id') id: number): Promise<IUser> {
    const user = this.userService.getUser(id);
    if (user) {
      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  @Get('all')
  async getAllUsers(): Promise<IUser[]> {
    const users = this.userService.getAllUsers();
    if (users) {
      return users;
    }

    throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
  }

  @Put('update/:id')
  async update(
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
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
