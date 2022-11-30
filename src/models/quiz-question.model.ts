import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuizAttemptAnswer } from './quiz-attempt-answer.model';
import { QuizQuestionOption } from './quiz-question-option.model';
import { Quiz } from './quiz.model';

@Entity()
export class QuizQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  question: string;

  @Column('text')
  explanation: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @OneToMany(() => QuizQuestionOption, (option) => option.question, {
    cascade: true,
  })
  options: QuizQuestionOption[];

  // @OneToMany(() => QuizAttemptAnswer, (answer) => answer.attempt)
  // attempt: QuizAttemptAnswer[];
}
