import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Delete, HttpStatus, UseFilters, Query, HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ROUTES } from '../../shared/config/routes';
import { ParamDto } from '../../shared/dto/param.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { HttpExceptionFilter } from '../../shared/filters/http-exception.filter';
import { PaginationQueryParamsDto } from '../../shared/dto/pagination-query-params.dto';

@Controller(ROUTES.USER.MAIN)
@UseFilters(HttpExceptionFilter)
@ApiTags('Users')
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
  async getUser(@Param() { id }: ParamDto): Promise<UserDto> {
    return this.userService.getUser(id);
  }

  @ApiOperation({
    summary: 'Gets all users',
    description: 'Gets all users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users gotten',
    type: UserDto,
  })

  @Get(ROUTES.USER.GET_ALL_USERS)
  async getAllUsers(@Query() paginationParams: PaginationQueryParamsDto): Promise<UserDto[]> {
    return this.userService.getAllUsers(paginationParams);
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
   @Put(ROUTES.USER.UPDATE)
  async updateUser(
     @Param() { id }: ParamDto,
     @Body() user: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(id, user);
  }

  @ApiOperation({
    summary: 'Deletes an existing user',
    description: 'Deletes an existing user',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(ROUTES.USER.DELETE)
   async deleteUser(@Param() { id }: ParamDto): Promise<void> {
     await this.userService.deleteUser(id);
   }
}
