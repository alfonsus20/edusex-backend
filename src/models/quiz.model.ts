import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Material } from './material.model';
import { QuizAttempt } from './quiz-attempt.model';
import { QuizQuestion } from './quiz-question.model';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { default: 80 })
  min_score: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;

  @OneToOne(() => Material, (material) => material.quiz)
  @JoinColumn()
  material: Material;

  @OneToMany(() => QuizQuestion, (question) => question.quiz, { cascade: true })
  questions: QuizQuestion[];

  @OneToMany(() => QuizAttempt, (attempt) => attempt.quiz, { cascade: true })
  attempts: QuizAttempt[];
}
