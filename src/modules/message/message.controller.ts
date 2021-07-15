import {
  Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put,
} from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { IMessage } from './interfaces/message.interface';
import { MessageService } from './message.service';
import { IUser } from '../user/interfaces/user.interface';
import { UserDto } from '../user/dto/user.dto';

 @Controller('message')
export class MessageController {
  constructor(private messageService:MessageService) {}

  @Post()
  @HttpCode(201)
  async createMessage(@Body()message:MessageDto):Promise<IMessage> {
    return this.messageService.createMessage(message);
  }

   @Get('get/:id')
   @HttpCode(200)
  async getMessage(@Param('id') id: number): Promise<IMessage> {
    return this.messageService.getMessage(id);
  }

   @Get('all')
   @HttpCode(200)
   async getAllMessages(): Promise<IMessage[]> {
     return this.messageService.getAllMessages();
   }

   @Put('update/:id')
   @HttpCode(200)
   async updateMessage(
     @Param('id') id: number,
     @Body() message: MessageDto,
   ): Promise<IMessage> {
     return this.messageService.updateMessage(id, message);
   }

   @Delete('delete/:id')
   @HttpCode(200)
   async deleteMessage(@Param('id') id: number): Promise<void> {
     await this.messageService.deleteMessage(id);
   }
}
