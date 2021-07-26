import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { MessageEntity } from '../../message/entities/message.entity';
import { IUser } from '../interfaces/user.interface';

@Entity('user')
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar', length: 30, nullable: false, default: '',
    })
    first_name: string;

    @Column({
      type: 'varchar', length: 30, nullable: false, default: '',
    })
    last_name: string;

    @Column({
      type: 'varchar', length: 60, nullable: true,
    })
    name: string;

    @Column({
      type: 'varchar', length: 40, unique: true, nullable: false,
    })
    email: string;

    @Column({ type: 'varchar', select: false })
    @Exclude({ toPlainOnly: true })
    password: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    updated_at: Date;

    @OneToMany(() => MessageEntity, (message:MessageEntity) => message.receiver)
    incoming_message:MessageEntity[];

    @OneToMany(() => MessageEntity, (message:MessageEntity) => message.sender)
    outcoming_message:MessageEntity[];

    @Column({ type: 'varchar', nullable: true, select: false })
    @Exclude({ toPlainOnly: true })
    token: string;
}
