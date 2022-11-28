import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizAttemptStatus } from '../enum';
import { QuizAttemptAnswer } from './quiz-attempt-answer.model';
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

  @OneToMany(() => QuizAttemptAnswer, (answer) => answer.attempt, {
    cascade: true,
  })
  answers: QuizAttemptAnswer[];

  @DeleteDateColumn()
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
