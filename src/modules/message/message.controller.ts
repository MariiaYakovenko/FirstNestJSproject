import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseFilters, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';
import { ROUTES } from '../../shared/config/routes';
import { ParamDto } from '../../shared/dto/param.dto';
import { CreateMessageDto } from './dto/create.message.dto';
import { UpdateMessageDto } from './dto/update.message.dto';
import { HttpExceptionFilter } from '../../shared/filters/http-exception.filter';
import { SenderAndReceiverDto } from './dto/sender-and-receiver.dto';
import { PaginationQueryParamsDto } from '../../shared/dto/pagination-query-params.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

 @Controller(ROUTES.MESSAGE.MAIN)
 @UseGuards(JwtAuthGuard)
 @UseFilters(HttpExceptionFilter)
 @ApiTags('Messages')
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
   @Post()
  async createMessage(@Body() message:CreateMessageDto):Promise<MessageDto> {
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
   async getMessage(@Param() { id }: ParamDto): Promise<MessageDto> {
     return this.messageService.getMessage(id);
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
   @Put(ROUTES.MESSAGE.UPDATE)
  async updateMessage(
     @Param() { id }: ParamDto,
     @Body() message: UpdateMessageDto,
  ): Promise<MessageDto> {
    return this.messageService.updateMessage(id, message);
  }

   @ApiOperation({
     summary: 'Deletes an existing message',
     description: 'Deletes an existing message',
   })
   @ApiResponse({
     status: HttpStatus.NO_CONTENT,
     description: 'Message deleted',
   })
   @HttpCode(HttpStatus.NO_CONTENT)
   @Delete(ROUTES.MESSAGE.DELETE)
   async deleteMessage(@Param() { id }: ParamDto): Promise<void> {
     await this.messageService.deleteMessage(id);
   }

  @ApiOperation({
    summary: 'Gets messages of two users',
    description: 'Gets messages of two users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Messages gotten',
    type: () => [MessageDto],
  })
  @Get(ROUTES.MESSAGE.GET_MESSAGES_OF_TWO_USERS)
   async getMessagesOfTwoUsers(@Query() params:SenderAndReceiverDto): Promise<[MessageDto[], number]> {
     return this.messageService.getMessagesOfTwoUsers(params);
   }

   @Get(ROUTES.MESSAGE.GET_MESSAGE_HISTORY)
  async getMessageHistory(
      @Param() { id }: ParamDto,
      @Query() paginationParams: PaginationQueryParamsDto,
  ): Promise<MessageDto[]> {
    return this.messageService.getMessageHistory(id, paginationParams);
  }
}
