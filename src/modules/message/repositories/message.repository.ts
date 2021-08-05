import { EntityRepository, Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';
import { IMessageRepository } from './message.repository.interface';
import { IMessage } from '../interfaces/message.interface';

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> implements IMessageRepository {
  async getMessagesOfTwoUsers(sender_id: number, receiver_id: number, per_page: number,
    page: number):Promise<[IMessage[], number]> {
    return this.createQueryBuilder('messages')
      .select(['messages.id', 'messages.created_at', 'messages.updated_at',
        'messages.sender_id', 'messages.receiver_id', 'messages.message_body'])
      .where('messages.receiver_id=:receiver_id AND messages.sender_id=:sender_id',
        { receiver_id, sender_id })
      .orWhere('messages.sender_id=:receiver_id AND messages.receiver.id=:sender_id',
        { receiver_id, sender_id })
      .orderBy('messages.created_at', 'ASC')
      .skip((page - 1) * per_page)
      .take(per_page)
      .getManyAndCount();
  }

  async getMessageHistoryOfSender(id: number): Promise<IMessage[]> {
    return this.createQueryBuilder('messages')
      .where('messages.sender_id=:id', { id })
      .leftJoinAndSelect('messages.receiver', 'receiver')
      .distinctOn(['messages.receiver_id'])
      .select(['messages.created_at', 'messages.updated_at', 'messages.message_body', 'receiver.name'])
      .orderBy({ 'messages.receiver_id': 'ASC', 'messages.created_at': 'DESC' })
      .getMany();
  }

  async getMessageHistoryOfReceiver(id: number): Promise<IMessage[]> {
    return this.createQueryBuilder('messages')
      .where('messages.receiver_id=:id', { id })
      .leftJoinAndSelect('messages.sender', 'sender')
      .distinctOn(['messages.sender_id'])
      .select(['messages.created_at', 'messages.updated_at', 'messages.message_body', 'sender.name'])
      .orderBy({ 'messages.sender_id': 'ASC', 'messages.created_at': 'DESC' })
      .getMany();
  }
}
