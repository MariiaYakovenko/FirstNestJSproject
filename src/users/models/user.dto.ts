import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
import { IUser } from './user.interface';

export class UserDto implements IUser {
  // добавить описания в ApiPropety
  // @ApiProperty()
  id: number;

  //  @ApiProperty()
  first_name: string;

  // @ApiProperty()
  last_name: string;

  // @ApiProperty()
  // @IsEmail()
  email: string;

  // @ApiProperty()
  //  @MinLength(6)
  password: string;

  // @ApiProperty()
  created_at: Date;

  // @ApiProperty()
  updated_at: Date;
}
