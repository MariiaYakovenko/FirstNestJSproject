import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Delete, HttpStatus, UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import { ROUTES } from '../../shared/config/routes';
import { ParamDto } from '../../shared/dto/param.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { MessageDto } from '../message/dto/message.dto';

@Controller(ROUTES.USER.MAIN)
@ApiResponse({ description: 'User controller' })
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: 'Creates a user',
    description: 'Creates a user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    type: UserDto,
  })
  @UsePipes()
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(user);
  }

  @ApiOperation({
    summary: 'Gets a user by id',
    description: 'Gets a user by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User by id gotten',
    type: UserDto,
  })
   @Get(ROUTES.USER.GET_USER)
  async getUser(@Param('id') id: ParamDto): Promise<UserDto> {
    return this.userService.getUser(id);
  }

  @ApiOperation({
    summary: 'Gets all users',
    description: 'Gets all users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users gotten',
    type: MessageDto,
  })
   @Get(ROUTES.USER.GET_ALL_USERS)
  async getAllUsers(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }

   @ApiOperation({
     summary: 'Updates an existing user',
     description: 'Updates an existing user',
   })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated',
    type: UserDto,
  })
  @UsePipes()
    @Put(ROUTES.USER.UPDATE)
  async updateUser(
     @Param('id') id: ParamDto,
     @Body() user: UpdateUserDto,
  ): Promise<IUser> {
    return this.userService.updateUser(id, user);
  }

  @ApiOperation({
    summary: 'Deletes an existing user',
    description: 'Deletes an existing user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted',
  })
    @Delete(ROUTES.USER.DELETE)
   async deleteUser(@Param('id') id: ParamDto): Promise<void> {
     await this.userService.deleteUser(id);
   }
}
