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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @OneToMany(() => QuizQuestionOption, (option) => option.question, {
    cascade: true,
  })
  options: QuizQuestionOption[];
}
