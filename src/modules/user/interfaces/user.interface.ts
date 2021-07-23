import { IMessage } from '../../message/interfaces/message.interface';

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  incoming_message?: IMessage[];
  outcoming_message?: IMessage[];
}
