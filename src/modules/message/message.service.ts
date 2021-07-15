import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRepository } from './repositories/message.repository';
import { IMessage } from './interfaces/message.interface';
import { CreateMessageDto } from './dto/create.message.dto';
import { UpdateMessageDto } from './dto/update.message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageRepository)
    private readonly messageRepository:MessageRepository,
  ) {}

  async createMessage(message:CreateMessageDto):Promise<IMessage> {
    return this.messageRepository.save(message);
  }

  async getMessage(id:number):Promise<IMessage> {
    const message = await this.messageRepository.findOne(id);
    if (message) {
      return message;
    }
    throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
  }

  async getAllMessages():Promise<IMessage[]> {
    const messages = await this.messageRepository.find();
    if (messages) {
      return messages;
    }
    throw new HttpException('Messages not found', HttpStatus.NOT_FOUND);
  }

  async updateMessage(id:number, message:UpdateMessageDto):Promise<IMessage> {
    await this.messageRepository.update(id, message);
    const updatedMessage = await this.getMessage(id);
    if (updatedMessage) {
      return updatedMessage;
    }
    throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
  }

  async deleteMessage(id:number):Promise<void> {
    await this.messageRepository.delete(id);
  }
}
