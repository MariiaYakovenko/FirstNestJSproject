import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './repositories/message.repository';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
