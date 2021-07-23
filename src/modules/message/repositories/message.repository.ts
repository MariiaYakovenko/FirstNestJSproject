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
  //
  // async getMessageHistory(id: number,
  //   paginationParams: PaginationQueryParamsType): Promise<IMessage[]> {
  //   return this.createQueryBuilder()
  //     .select('messages')
  //     .from(MessageEntity, 'messages')
  //     .where('messages.receiver_id=:id OR messages.sender_id=:id',
  //       { id })
  //     .groupBy('messages.id')
  //     .orderBy('messages.created_at', 'DESC')
  //     .skip((paginationParams.page - 1) * paginationParams.per_page)
  //     .take(paginationParams.per_page)
  //     .getMany();

  // async getMessageHistory(id: number,
  //   paginationParams: PaginationQueryParamsType): Promise<IMessage[]> {
  //   return this.createQueryBuilder('messages')
  //    // .select(['ARRAY_AGG((messages.created_at, messages.message_body)) AS dates', 'messages.sender_id AS id'])
  //     .select(['MAX(messages.created_at) AS date', 'messages.sender_id AS sender'])
  //     .where('messages.receiver_id=:id', { id })
  //     .groupBy('sender')
  //     .orderBy('sender')
  //    // .skip((paginationParams.page - 1) * paginationParams.per_page)
  //    // .take(paginationParams.per_page)
  //     .getRawMany();

  async getMessageHistory(id: number,
    paginationParams: PaginationQueryParamsType): Promise<IMessage[]> {
    return this.createQueryBuilder()
      .select(['DISTINCT (messages.receiver_id), DISTINCT (messages.sender_id), messages.created_at AS date, '
      + 'messages.message_body AS text, messages.receiver AS receiver, messages.sender AS sender, messages.id AS id'])
      .from(MessageEntity, 'messages')
      .where('messages.receiver_id=:id OR messages.sender_id=:id',
        { id })
      .leftJoin('messages.receiver', 'receiver')
      .leftJoin('messages.sender', 'sender')
      .groupBy('messages.id')
      .orderBy('messages.created_at', 'DESC')
      .skip((paginationParams.page - 1) * paginationParams.per_page)
      .take(paginationParams.per_page)
      .getMany();
  }
}
