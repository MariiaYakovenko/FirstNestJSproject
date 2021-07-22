import {
  Body, Controller, HttpStatus, Post, UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../../shared/filters/http-exception.filter';
import { ROUTES } from '../../shared/config/routes';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { UserDto } from '../user/dto/user.dto';
import { CreateUserDto } from '../user/dto/create.user.dto';

@Controller(ROUTES.AUTH.MAIN)
@UseFilters(HttpExceptionFilter)
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService:AuthService) {}

  @ApiOperation({
    summary: 'Signs up a user',
    description: 'Signs up a user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User signed up',
    type: UserDto,
  })
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.authService.createUser(user);
  }

  @ApiOperation({
    summary: 'Signs in a user',
    description: 'Signs in a user',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'User signed in',
    type: UserDto,
  })
  @Post(ROUTES.AUTH.LOGIN)
  async login(@Body() loginUserDto: LoginUserDto): Promise<string> {
    return this.authService.login(loginUserDto);
  }
}
