import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizAttemptStatus } from '../enum';
import { Quiz } from './quiz.model';
import { User } from './user.model';

@Entity()
export class QuizAttempt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  score: number;

  @Column({ type: 'enum', enum: QuizAttemptStatus })
  status: QuizAttemptStatus;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Quiz)
  quiz: Quiz;

  @CreateDateColumn()
  created_at: Date;
}
