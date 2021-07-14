import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { configService } from './shared/config/config.service';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), UserModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
