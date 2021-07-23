import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert,
} from 'typeorm';
import { MessageEntity } from '../../message/entities/message.entity';
import { IUser } from '../interfaces/user.interface';

@Entity('user')
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 30 })
    first_name: string;

    @Column({ type: 'varchar', length: 30 })
    last_name: string;

    @Column({
      type: 'varchar', length: 40, unique: true, nullable: false,
    })

    email: string;


    @Column({ type: 'varchar' })
    password: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    updated_at: Date;

    @OneToMany(() => MessageEntity, (message:MessageEntity) => message.receiver)
    incoming_message:MessageEntity[];

    @OneToMany(() => MessageEntity, (message:MessageEntity) => message.sender)
    outcoming_message:MessageEntity[];
}
