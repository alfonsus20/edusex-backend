import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiscussionQuestionReply } from './discussion-question-reply.model';
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

  @OneToMany(() => DiscussionQuestionReply, (reply) => reply.question)
  replies: DiscussionQuestionReply[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
