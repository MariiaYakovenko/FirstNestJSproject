import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './repositories/message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
  controllers: [],
  providers: [],
})
export class MessageModule {}
