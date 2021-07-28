import {
  Body, ClassSerializerInterceptor, Controller, HttpStatus, Post, Req, UseFilters, UseGuards, UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../../shared/filters/http-exception.filter';
import { ROUTES } from '../../shared/config/routes';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { UserDto } from '../user/dto/user.dto';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

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
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() user: CreateUserDto, @Req() req): Promise<UserDto> {
    const createdUser = await this.authService.createUser(user);
    req.res.setHeader('accessToken', createdUser.accessToken);
    req.res.setHeader('refreshToken', createdUser.refreshToken);
    req.res.setHeader('expiresAt', createdUser.expiresAt.exp);
    return createdUser.createdUserFromDb;
  }

  @ApiBody({
    schema: { example: { email: 'user@gmaiil.com', password: '123456' } },
  })
  @ApiOperation({
    summary: 'Signs in a user',
    description: 'Signs in a user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User signed in',
    type: UserDto,
  })
  @Post(ROUTES.AUTH.LOGIN)
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginUserDto: LoginUserDto, @Req() req): Promise<UserDto> {
    const user = await this.authService.login(loginUserDto);
    req.res.setHeader('accessToken', user.accessToken);
    req.res.setHeader('refreshToken', user.refreshToken);
    req.res.setHeader('expiresAt', user.expiresAt.exp);
    return user.confirmedUserFromDb;
  }

  @Post('refresh-token')
  @ApiHeader({
    name: 'refreshToken',
    description: 'user refresh token',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed.',
    schema: { example: { result: true } },
  })
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@Req() req): Promise<void> {
    const result = await this.authService.generateJwt(req.params);
    req.res.setHeader('accessToken', result.accessToken);
    req.res.setHeader('refreshToken', result.refreshToken);
    req.res.setHeader('expiresAt', result.expiresAt.exp);
  }
}
