import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRepository } from './repositories/message.repository';
import { MessageDto } from './dto/message.dto';
import { IMessage } from './interfaces/message.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageRepository)
    private readonly messageRepository:MessageRepository,
  ) {}

  async createMessage(message:MessageDto):Promise<IMessage> {
    return this.messageRepository.createMessage(message);
  }

  async getMessage(id:number):Promise<IMessage> {
    return this.messageRepository.getMessage(id);
  }

  async getAllMessages():Promise<IMessage[]> {
    return this.messageRepository.getAllMessages();
  }

  async updateMessage(id:number, message:MessageDto):Promise<IMessage> {
    await this.messageRepository.updateMessage(id, message);
    return this.getMessage(id);
  }

  async deleteMessage(id:number):Promise<void> {
    await this.messageRepository.deleteMessage(id);
  }
}
