import {
  Controller,
  Body,
  Put,
  Param,
  Get,
  Delete, HttpStatus, UseFilters, Query, HttpCode, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ROUTES } from '../../shared/config/routes';
import { ParamDto } from '../../shared/dto/param.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { HttpExceptionFilter } from '../../shared/filters/http-exception.filter';
import { PaginationQueryParamsDto } from '../../shared/dto/pagination-query-params.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserNameDto } from './dto/user.name.dto';

@Controller(ROUTES.USER.MAIN)
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

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

   @ApiOperation({
     summary: 'Finds a user by their name',
     description: 'Finds a user by their name',
   })
   @ApiResponse({
     status: HttpStatus.OK,
     description: 'User found',
   })
   @Get(ROUTES.USER.FIND)
  async findUserByName(@Query() { name }: UserNameDto): Promise<UserDto[]|UserDto> {
    return this.userService.findUserByName(name);
  }
}
