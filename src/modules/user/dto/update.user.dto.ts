import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create.user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
  token: string;
}
