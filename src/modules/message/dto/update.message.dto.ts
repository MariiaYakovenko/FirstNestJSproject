import { PickType } from '@nestjs/swagger';
import { CreateMessageDto } from './create.message.dto';

export class UpdateMessageDto extends PickType(CreateMessageDto, ['message_body']) {
  id: number;
}
