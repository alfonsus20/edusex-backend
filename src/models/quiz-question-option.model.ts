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

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;

  @ManyToOne(() => QuizQuestion, (question) => question.options)
  question: QuizQuestion;
}
