import { EntityRepository, Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';
import { IMessageRepository } from './message.repository.interface';
import { PaginationQueryParamsType } from '../../../shared/types/pagination-query-params.type';
import { IMessage } from '../interfaces/message.interface';

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> implements IMessageRepository {
  async getMessagesOfTwoUsers(sender_id: number, receiver_id: number,
    paginationParams: PaginationQueryParamsType):Promise<IMessage[]> {
    return this.createQueryBuilder()
      .select('messages')
      .from(MessageEntity, 'messages')
      .where('messages.receiver_id=:receiver_id AND messages.sender_id=:sender_id',
        { receiver_id, sender_id })
      .orWhere('messages.sender_id=:receiver_id AND messages.receiver.id=:sender_id',
        { receiver_id, sender_id })
      .groupBy('messages.id')
      .orderBy('messages.created_at', 'ASC')
      .skip((paginationParams.page - 1) * paginationParams.per_page)
      .take(paginationParams.per_page)
      .getMany();
  }

  async getMessageHistory(id: number,
    paginationParams: PaginationQueryParamsType): Promise<IMessage[]> {
    return this.createQueryBuilder()
      .select('messages')
      .from(MessageEntity, 'messages')
      .where('messages.receiver_id=:id OR messages.sender_id=:id',
        { id })
      .andWhere('messages.receiver_id!=id AND messages.sender_id!=id', { id })
      .groupBy('messages.id')
      .orderBy('messages.created_at', 'DESC')
      .where('messages.receiver_id=:id OR messages.sender_id=:id', { id })
      .skip((paginationParams.page - 1) * paginationParams.per_page)
      .take(paginationParams.per_page)
      .getMany();
  }
}
