import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  sender_id: number;

  @Column()
  receiver_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  message_body: string;

  //декоратор для связи с Entity User (one-to-many)
  //  @ManyToOne(()=>UserEntity, (user:UserEntity)=>user.outcomingMessage)
  //  sender:UserEntity;

  //декоратор для связи с Entity User (one-to-many)
  //  @ManyToOne(()=>UserEntity, (user:UserEntity)=>user.incomingMessage)
  //  receiver:UserEntity;

  //many-to-one может быть

  //@ManyToOne(()=>User, (chat:User)=>chat.messages)
  //chat:User;
}
