import { PickType } from '@nestjs/swagger';
import { MessageDto } from './message.dto';

export class LastMessageDto extends PickType(MessageDto, ['sender', 'receiver', 'message_body']) {}
