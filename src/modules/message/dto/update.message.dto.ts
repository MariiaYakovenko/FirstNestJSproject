import { PickType } from '@nestjs/swagger';
import { MessageDto } from './message.dto';

export class UpdateMessageDto extends PickType(MessageDto, ['id', 'message_body']) {

}
