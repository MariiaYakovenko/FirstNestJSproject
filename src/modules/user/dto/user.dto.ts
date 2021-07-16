import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail, IsNotEmpty, IsString, Length,
} from 'class-validator';
import { IUser } from '../interfaces/user.interface';
import { MessageEntity } from '../../message/entities/message.entity';

export class UserDto implements IUser {
   @ApiProperty({
     description: 'User\'s id',
     type: Number,
     uniqueItems: true,
   })
     id: number;

    @ApiProperty({
      description: 'User\'s first name',
      type: String,
      required: true,
      nullable: false,
      minLength: 1,
      maxLength: 30,
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
     first_name: string;

   @ApiProperty({
     description: 'User\'s last name',
     type: String,
     required: true,
     nullable: false,
     minLength: 1,
     maxLength: 30,
   })
   @IsString()
   @IsNotEmpty()
   @Length(1, 30)
     last_name: string;

    @ApiProperty({
      description: 'User\'s email',
      type: String,
      required: true,
      nullable: false,
      uniqueItems: true,
      minLength: 10,
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
     email: string;

   @ApiProperty({
     description: 'User\'s password',
     type: String,
     required: true,
     nullable: false,
     minLength: 6,
     maxLength: 30,
   })
   @IsString()
   @IsNotEmpty()
   @Length(6, 30)
    password: string;

   @ApiProperty({
     description: 'Time at what user was created',
     type: Date,
   })
    created_at: Date;

   @ApiProperty({
     description: 'Time at what user was updated',
     type: Date,
   })
     updated_at: Date;

   @ApiProperty({
     description: 'Array of received messages',
     type: MessageEntity,
   })
    incoming_message: MessageEntity[];

   @ApiProperty({
     description: 'Array of sent messages',
     type: MessageEntity,
   })
     outcoming_message: MessageEntity[];
}
