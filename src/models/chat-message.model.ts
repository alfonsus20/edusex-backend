import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRoom } from './chat-room.model';
import { User } from './user.model';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  message: string;

  @Column('boolean', { default: false })
  is_read: boolean;

  @ManyToOne(() => User)
  owner: User;

  @ManyToOne(() => ChatRoom, (room) => room.messages)
  room: ChatRoom;

  @CreateDateColumn()
  created_at: Date;
}
