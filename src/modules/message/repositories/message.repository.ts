import { EntityRepository, Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';
import { MessageDto } from '../dto/message.dto';
import { IMessage } from '../interfaces/message.interface';

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {
  async createMessage(message: MessageDto):Promise<IMessage> {
    return this.save(message);
  }

  async getMessage(id:number):Promise<IMessage> {
    return this.findOne(id);
  }

  async getAllMessages():Promise<IMessage[]> {
    return this.find();
  }

  async updateMessage(id:number, message:MessageDto):Promise<void> {
    await this.update(id, message);
  }

  async deleteMessage(id:number):Promise<void> {
    await this.delete(id);
  }
}
