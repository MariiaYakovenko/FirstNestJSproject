import {
  Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';
import { ROUTES } from '../../shared/config/routes';
import { ParamDto } from '../../shared/dto/param.dto';
import { CreateMessageDto } from './dto/create.message.dto';
import { UpdateMessageDto } from './dto/update.message.dto';

 @Controller(ROUTES.MESSAGE.MAIN)
 @ApiResponse({ description: 'Message controller' })
export class MessageController {
  constructor(private messageService:MessageService) {}

   @ApiOperation({
     summary: 'Creates a message of two users',
     description: 'Creates a message of two users',
   })
   @ApiResponse({
     status: HttpStatus.CREATED,
     description: 'Message created',
     type: MessageDto,
   })
   @UsePipes()
   @Post()
  async createMessage(@Body()message:CreateMessageDto):Promise<MessageDto> {
    return this.messageService.createMessage(message);
  }

  @ApiOperation({
    summary: 'Gets a message by id',
    description: 'Gets a message by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Message by id gotten',
    type: MessageDto,
  })
   @Get(ROUTES.MESSAGE.GET_MESSAGE)
   async getMessage(@Param('id') id: ParamDto): Promise<MessageDto> {
     return this.messageService.getMessage(id);
   }

   @ApiOperation({
     summary: 'Gets all messages existing in db',
     description: 'Gets all messages existing in db'
   })
   @ApiResponse({
     status: HttpStatus.OK,
     description: 'Message by id gotten',
     type: MessageDto,
   })
   @Get(ROUTES.MESSAGE.GET_ALL_MESSAGES)
  async getAllMessages(): Promise<MessageDto[]> {
    return this.messageService.getAllMessages();
  }

   @ApiOperation({
     summary: 'Updates an existing message',
     description: 'Updates an existing message',
   })
   @ApiResponse({
     status: HttpStatus.OK,
     description: 'Message updated',
     type: MessageDto,
   })
   @UsePipes()
   @Put(ROUTES.MESSAGE.UPDATE)
   async updateMessage(
     @Param('id') id: ParamDto,
     @Body() message: UpdateMessageDto,
   ): Promise<MessageDto> {
     return this.messageService.updateMessage(id, message);
   }

   @ApiOperation({
     summary: 'Deletes an existing message',
     description: 'Deletes an existing message',
   })
   @ApiResponse({
     status: HttpStatus.OK,
     description: 'Message deleted',
   })
   @Delete(ROUTES.MESSAGE.DELETE)
   async deleteMessage(@Param('id') id: ParamDto): Promise<void> {
     await this.messageService.deleteMessage(id);
   }
}
