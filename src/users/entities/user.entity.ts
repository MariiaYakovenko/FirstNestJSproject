import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import { Message } from 'src/users/entities/message.entity';
import { IUser } from '../models/user.interface';

@Entity('users')
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

    @Column({ type: 'varchar', length: 30 })
    password: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    updated_at: Date;

    @OneToMany(() => Message, (message:Message) => message.receiver_id)
    incoming_message:Message[];

    @OneToMany(() => Message, (message:Message) => message.sender_id)
    outcoming_message:Message[];
}
