import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from 'src/repository/repository.entity';

@Module({
  //forFeature разобраться
  //imports: [TypeOrmModule.forFeature([UserEntity])],
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
