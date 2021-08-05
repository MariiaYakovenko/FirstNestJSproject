import { ApiProperty } from '@nestjs/swagger';
import { IMessagesWithPagination } from '../interfaces/messages-with-pagination.interface';
import { IMessage } from '../interfaces/message.interface';
import { MessageDto } from './message.dto';

export class MessagesWithPaginationDto implements IMessagesWithPagination {
  @ApiProperty({
    description: 'Array of messages of two users',
    type: () => [MessageDto],
  })
  messages: IMessage[];

  @ApiProperty({
    description: 'Current page',
    type: Number,
  })
  current_page: number;

  @ApiProperty({
    description: 'Total amount of pages',
    type: Number,
  })
  total_pages: number;

  @ApiProperty({
    description: 'Total amount of records',
    type: Number,
  })
  total_records: number;
}
