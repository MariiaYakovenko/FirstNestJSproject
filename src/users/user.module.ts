import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/repository/repository.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  // forFeature разобраться
  imports: [TypeOrmModule.forFeature([UsersRepository])], // UserRepository - rename
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
