import { MessageEntity } from '../../message/entities/message.entity';

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  incoming_message: MessageEntity[];
  outcoming_message: MessageEntity[];
}
