import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './repositories/message.repository';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { UserRepository } from '../user/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository, UserRepository])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
