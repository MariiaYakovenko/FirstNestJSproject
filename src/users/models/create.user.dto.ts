import { IUser } from "./user.interface";


export class CreateUserDTO implements IUser{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;  
}
