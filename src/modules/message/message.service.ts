import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageRepository } from './repositories/message.repository';
import { IMessage } from './interfaces/message.interface';
import { ParamDto } from '../../shared/dto/param.dto';
import { UserRepository } from '../user/repositories/user.repository';
import { CreateMessageType } from './types/create.message.type';
import { UpdateMessageType } from './types/update.message.type';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
  ) {
  }

  async createMessage(message: CreateMessageType): Promise<IMessage> {
    const receiver = await this.userRepository.findOne(message.receiver_id, { relations: ['incoming_message'] });
    if (!receiver) throw new HttpException('Receiver not found', HttpStatus.NOT_FOUND);
    const sender = await this.userRepository.findOne(message.sender_id, { relations: ['outcoming_message'] });
    if (!sender) throw new HttpException('Sender not found', HttpStatus.NOT_FOUND);
    return this.messageRepository.save(message);
  }

  async getMessage(id: number): Promise<IMessage> {
    const message = await this.messageRepository.findOne(id);
    if (!message) throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    return message;
  }

  async updateMessage(id: number, message: UpdateMessageType): Promise<IMessage> {
    const updatedMessage = await this.messageRepository.findOne(id);
    if (!updatedMessage) throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    updatedMessage.message_body = message.message_body;
    return this.messageRepository.save(updatedMessage);
  }

  async deleteMessage(id: number): Promise<void> {
    const result = await this.messageRepository.delete(id);
    if (!result.affected) throw new HttpException('Message to be deleted not found', HttpStatus.NOT_FOUND);
  }

  // async getUserMessages(senderId: number, receiverId: number): Promise<IMessage[]> {
  //   const receiver = await this.userRepository.findOne(receiverId.id, { relations: ['incoming_message'] });
  //   if (!receiver) throw new HttpException('Receiver not found', HttpStatus.NOT_FOUND);
  //   const sender = await this.userRepository.findOne(senderId.id, { relations: ['outcoming_message'] });
  //   if (!sender) throw new HttpException('Sender not found', HttpStatus.NOT_FOUND);
  //   const messages = [...receiver.incoming_message, ...sender.outcoming_message];
  //   messages.sort((a: any, b: any) => +(new Date(a.created_at.valueOf())) - +(new Date(b.created_at.valueOf())));
  //   return messages;
  // }
}
