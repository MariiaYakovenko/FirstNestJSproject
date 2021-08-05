import { IGlobalRepository } from '../../../shared/interfaces/global.repository.interface';
import { MessageEntity } from '../entities/message.entity';
import { IMessage } from '../interfaces/message.interface';

export interface IMessageRepository extends IGlobalRepository<MessageEntity> {
  getMessagesOfTwoUsers(sender_id: number, receiver_id: number, per_page: number,
                        page: number):Promise<[IMessage[], number]>;

  getMessageHistoryOfSender(id: number): Promise<IMessage[]>;

  getMessageHistoryOfReceiver(id: number): Promise<IMessage[]>;
}
