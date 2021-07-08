import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Message } from "src/users/entities/message.entity";
import { IUser } from "../models/user.interface";

@Entity('users')
export class UserEntity implements IUser{
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "varchar", length: 30})
    first_name: string;

    @Column({type: "varchar", length: 30})
    last_name: string;

    @Column({type: "varchar", length: 40, unique:true, nullable:false})
    email: string;

    @Column({type: "varchar", length:30})
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

  //incoming & outcoming messages (OneToMany both)
//  @OneToMany(()=>Message, (message:Message)=>message.receiver_id)
 // incomingMessage:Message[];

  //@OneToMany(()=>Message, (message:Message)=>message.sender_id)
  //outcomingMessage:Message[];

  //повыносить константные значения в отдельный файл constanse

  
}