import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuizQuestion } from './quiz-question.model';

@Entity()
export class QuizQuestionOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { default: false })
  is_true: boolean;

  @Column('text')
  option: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => QuizQuestion, (question) => question.options)
  question: QuizQuestion;
}
