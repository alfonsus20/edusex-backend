import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from './topic.model';
import { User } from './user.model';

@Entity()
export class DiscussionQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  question: string;

  @ManyToOne(() => Topic)
  topic: Topic;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
