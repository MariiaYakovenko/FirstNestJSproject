import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from './create.user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
  @Exclude()
  password: string;
}
