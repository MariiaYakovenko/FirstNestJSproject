import { IUser } from './user.interface';

export class UserDto implements IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
