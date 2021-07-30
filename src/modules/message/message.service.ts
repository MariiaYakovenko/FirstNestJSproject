import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageRepository } from './repositories/message.repository';
import { IMessage } from './interfaces/message.interface';
import { UserRepository } from '../user/repositories/user.repository';
import { CreateMessageType } from './types/create.message.type';
import { UpdateMessageType } from './types/update.message.type';
import { assignObjects } from '../../shared/assign_objects/assign-objects.helper';
import { SenderAndReceiverType } from './types/sender-and-receiver.type';
import { IResponse } from './interfaces/response.interface';

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

  async getMessagesOfTwoUsers(senderAndReceiver: SenderAndReceiverType): Promise<IResponse> {
    const messages = await this.messageRepository.getMessagesOfTwoUsers(senderAndReceiver.sender_id,
      senderAndReceiver.receiver_id, senderAndReceiver.per_page, senderAndReceiver.page);
    if (!messages.length) throw new HttpException('Messages not found', HttpStatus.NOT_FOUND);
    const recordsAmount = messages[1];
    const rawMessages = messages[0];
    return {
      messages: rawMessages,
      current_page: senderAndReceiver.page,
      total_pages: Math.trunc((recordsAmount / senderAndReceiver.per_page)) + 1,
      total_records: recordsAmount,
    };
  }

  async getMessageHistory(id: number): Promise<IMessage[]> {
    const messagesOfSender = await this.messageRepository.getMessageHistoryOfSender(id);
    const messagesOfReceiver = await this.messageRepository.getMessageHistoryOfReceiver(id);
    if (!messagesOfSender.length && !messagesOfReceiver.length) {
      throw new HttpException('Messages not found', HttpStatus.NOT_FOUND);
    }
    const messages = [...messagesOfSender, ...messagesOfReceiver];
    messages.sort((a, b) => {
      const c: any = new Date(a.created_at);
      const d: any = new Date(b.created_at);
      return d - c;
    });
    for (let i = 0; i < messages.length - 1; i++) {
      if ((messages[i].sender === messages[i + 1].receiver)
        || (messages[i].receiver === messages[i + 1].sender)) {
        messages.splice(i + 1, 1);
      }
    }
    return messages;
  }
}
