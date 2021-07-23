import { CreateUserType } from './create.user.type';

export type UpdateUserType = Partial<CreateUserType>&{id: number};
