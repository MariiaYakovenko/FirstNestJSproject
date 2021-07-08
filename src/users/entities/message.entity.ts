import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, OneToOne} from "typeorm";
import { User } from "./user.entity";

@Entity('messages')
export class Message{

    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    sender_id:number;

    @Column()
    receiver_id:number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    message_body:string;
    
    //декоратор для связи с Entity User (one-to-many)
     @ManyToOne(()=>User, (user:User)=>user.outcomingMessage)
     sender:User;

    //декоратор для связи с Entity User (one-to-many)
     @ManyToOne(()=>User, (user:User)=>user.incomingMessage)
     receiver:User;

    //many-to-one может быть

    //@ManyToOne(()=>User, (chat:User)=>chat.messages)
    //chat:User;


}