import { PickType } from '@nestjs/swagger';
import { MessageDto } from './message.dto';

export class CreateMessageDto extends PickType(MessageDto, ['sender_id', 'receiver_id', 'message_body']) {

}
