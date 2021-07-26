import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserDto extends PickType(UserDto, ['first_name', 'last_name', 'email']) {
  password: string;
}
