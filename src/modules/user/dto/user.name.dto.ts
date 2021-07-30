import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserNameDto extends PickType(UserDto, ['name']) {}
