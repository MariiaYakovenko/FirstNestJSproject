import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageRepository } from './repositories/message.repository';
import { IMessage } from './interfaces/message.interface';
import { UserRepository } from '../user/repositories/user.repository';
import { CreateMessageType } from './types/create.message.type';
import { UpdateMessageType } from './types/update.message.type';
import { assignObjects } from '../../shared/assign_objects/assign-objects.helper';
import { PaginationQueryParamsType } from '../../shared/types/pagination-query-params.type';
import { SenderAndReceiverType } from './types/sender-and-receiver.type';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
  ) {
  }

  async createMessage(message: CreateMessageType): Promise<IMessage> {
    const receiver = await this.userRepository.findOne(message.receiver_id,
      { relations: ['incoming_message'] });
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
    assignObjects(updatedMessage, message);
    return this.messageRepository.save(updatedMessage);
  }

  async deleteMessage(id: number): Promise<void> {
    const result = await this.messageRepository.delete(id);
    if (!result.affected) throw new HttpException('Message to be deleted not found', HttpStatus.NOT_FOUND);
  }

  async getMessagesOfTwoUsers(senderAndReceiver: SenderAndReceiverType): Promise<[IMessage[], number]> {
    const messages = await this.messageRepository.getMessagesOfTwoUsers(senderAndReceiver.sender_id,
      senderAndReceiver.receiver_id, senderAndReceiver.per_page, senderAndReceiver.page);
    if (!messages.length) throw new HttpException('Messages not found', HttpStatus.NOT_FOUND);
    return messages;
  }

  async getMessageHistory(id: number,
    paginationParams: PaginationQueryParamsType): Promise<IMessage[]> {
    const messages = await this.messageRepository.getMessageHistory(id, paginationParams);
    return messages;
  }
}
