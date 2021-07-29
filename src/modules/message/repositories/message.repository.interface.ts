import { IGlobalRepository } from '../../../shared/interfaces/global.repository.interface';
import { MessageEntity } from '../entities/message.entity';
import { IMessage } from '../interfaces/message.interface';
import { PaginationQueryParamsType } from '../../../shared/types/pagination-query-params.type';

export interface IMessageRepository extends IGlobalRepository<MessageEntity> {
  getMessagesOfTwoUsers(sender_id: number, receiver_id: number, per_page: number,
                        page: number):Promise<[IMessage[], number]>;

  getMessageHistory(id: number,
                    paginationParams: PaginationQueryParamsType): Promise<IMessage[]>
}
