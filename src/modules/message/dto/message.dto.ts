import { ApiProperty } from '@nestjs/swagger';
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
  })
  message_body: string;
}
