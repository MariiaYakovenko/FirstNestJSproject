import { IMessage } from '../interfaces/message.interface';
import { UserEntity } from '../../user/entities/user.entity';

export class MessageDto implements IMessage {
  id: number;
  sender_id: number;
  sender: UserEntity;
  receiver_id: number;
  receiver: UserEntity;
  created_at: Date;
  updated_at: Date;
  message_body: string;
}
