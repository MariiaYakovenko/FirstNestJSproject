import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { IMessage } from '../interfaces/message.interface';

@Entity('messages')
export class MessageEntity implements IMessage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int4')
  sender_id: number;

  @ManyToOne(() => UserEntity, (user:UserEntity) => user.outcoming_message)
  @JoinColumn({ name: 'sender_id' })
  sender:UserEntity;

  @Column('int4')
  receiver_id: number;

  @ManyToOne(() => UserEntity, (user:UserEntity) => user.incoming_message)
  @JoinColumn({ name: 'receiver_id' })
  receiver:UserEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  updated_at: Date;

  @Column({ type: 'varchar' })
  message_body: string;
}
