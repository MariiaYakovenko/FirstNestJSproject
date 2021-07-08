import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Message } from "src/users/entities/message.entity";

@Entity('users')
export class User{

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "varchar", length: 30})
    first_name: string;

    @Column({type: "varchar", length: 30})
    last_name: string;

    @Column({type: "varchar", length: 40, unique:true})
    email: string;

    @Column({type: "varchar", length:30})
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    //call-back - функция принимает другую функцию и выполняет ее
   // @ManyToMany(()=>Message, (messages)=>messages.receiverId)
  //  @ManyToMany(()=>Message, (messages)=>messages.senderId)
  //  @JoinTable()
  //  messages: Message[];

  //one-to-many может быть

  //incoming & outcoming messages (OneToMany both)
  @OneToMany(()=>Message, (message:Message)=>message.receiver_id)
  incomingMessage:Message[];

  @OneToMany(()=>Message, (message:Message)=>message.sender_id)
  outcomingMessage:Message[];


  


}