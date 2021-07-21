import { IGlobalRepository } from '../../../shared/interfaces/global.repository.interface';
import { MessageEntity } from '../entities/message.entity';
import { PaginationQueryParamsType } from '../../../shared/types/pagination-query-params.type';
import { IMessage } from '../interfaces/message.interface';

export interface IMessageRepository extends IGlobalRepository<MessageEntity> {
  getMessagesOfTwoUsers(sender_id: number, receiver_id: number,
                        paginationParams: PaginationQueryParamsType):Promise<IMessage[]>;
}
