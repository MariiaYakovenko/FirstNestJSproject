import { EntityRepository, Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';
import { MessageDto } from '../dto/message.dto';
import { IMessage } from '../interfaces/message.interface';
import { IMessageRepository } from './message.repository.interface';

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> implements IMessageRepository {

}
