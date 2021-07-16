import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageRepository } from './repositories/message.repository';
import { IMessage } from './interfaces/message.interface';
import { CreateMessageDto } from './dto/create.message.dto';
import { UpdateMessageDto } from './dto/update.message.dto';
import { ParamDto } from '../../shared/dto/param.dto';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository:MessageRepository,
    private readonly userRepository:UserRepository,
  ) {}

  async createMessage(message:CreateMessageDto):Promise<IMessage> {
    const receiver = await this.userRepository.findOne(message.receiver_id);
    if (!receiver) throw new HttpException('Receiver not found', HttpStatus.NOT_FOUND);
    const sender = await this.userRepository.findOne(message.sender_id);
    if (!sender) throw new HttpException('Sender not found', HttpStatus.NOT_FOUND);
    return this.messageRepository.save(message);
  }

  async getMessage(id:ParamDto):Promise<IMessage> {
    const message = await this.messageRepository.findOne(id);
    if (!message) throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    return message;
  }

  async getAllMessages():Promise<IMessage[]> {
    const messages = await this.messageRepository.find();
    if (!messages) throw new HttpException('Messages not found', HttpStatus.NOT_FOUND);
    return messages;
  }

  async updateMessage(id:ParamDto, message:UpdateMessageDto):Promise<IMessage> {
    const updatedMessage = await this.messageRepository.findOne(id);
    if (!updatedMessage) throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    updatedMessage.message_body = message.message_body;
    return this.messageRepository.save(updatedMessage);
  }

  async deleteMessage(id:ParamDto):Promise<void> {
    const result = await this.messageRepository.delete(id);
    if (result.affected === 0) throw new HttpException('Message to be deleted not found', HttpStatus.NOT_FOUND);
  }
}
