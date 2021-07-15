import { IGlobalRepository } from '../../user/repositories/global.repository.interface';
import { MessageEntity } from '../entities/message.entity';

export interface IMessageRepository extends IGlobalRepository<MessageEntity> {

}