import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt, IsNotEmpty, IsPositive, IsString, Length,
} from 'class-validator';
import { IMessage } from '../interfaces/message.interface';
import { UserEntity } from '../../user/entities/user.entity';

export class MessageDto implements IMessage {
  @ApiProperty({
    description: 'Message id',
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Sender\'s id',
    type: Number,
    required: true,
    nullable: false,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  sender_id: number;

  @ApiProperty({
    description: 'Message sender',
    type: UserEntity,
  })
  sender: UserEntity;

  @ApiProperty({
    description: 'Receiver\'s id',
    type: Number,
    required: true,
    nullable: false,
  })
  @IsInt()
  @IsPositive()
  receiver_id: number;

  @ApiProperty({
    description: 'Message receiver',
    type: UserEntity,
  })
  receiver: UserEntity;

  @ApiProperty({
    description: 'Time at what message was created',
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    description: 'Time at what message was updated',
    type: Date,
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Message body',
    type: String,
    required: true,
    nullable: false,
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  @Length(1, 1000)
  message_body: string;
}
