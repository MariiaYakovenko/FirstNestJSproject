import { IUser } from '../../user/interfaces/user.interface';

export type LastMessageType = {
  sender: IUser;
  receiver: IUser;
  message_body: string;
}
