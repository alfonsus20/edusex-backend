import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiscussionQuestion } from './discussion-question.model';
import { User } from './user.model';

@Entity()
export class DiscussionQuestionReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  reply: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => DiscussionQuestion, (question) => question.replies)
  question: DiscussionQuestion;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
