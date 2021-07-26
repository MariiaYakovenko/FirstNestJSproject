import {
  Body, ClassSerializerInterceptor, Controller, HttpStatus, Post, Req, UseFilters, UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';
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

  @ApiBody({
    type: CreateUserDto,
  })
  @ApiOperation({
    summary: 'Signs up a user',
    description: 'Signs up a user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User signed up',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() user: CreateUserDto, @Req() req): Promise<UserDto> {
    const createdUser = await this.authService.createUser(user);
    req.res.setHeader('invitation', createdUser.token);
    return createdUser;
  }

  @ApiBody({
    schema: { example: { email: 'user@gmaiil.com', password: '123456' } },
  })
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
  async login(@Body() loginUserDto: LoginUserDto, @Req() req): Promise<UserDto> {
    const user = await this.authService.login(loginUserDto);
    req.res.setHeader('invitation', await this.authService.generateJwt(user));
    return user;
  }
}
