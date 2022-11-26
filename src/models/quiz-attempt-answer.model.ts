import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuizAttempt } from './quiz-attempt.model';
import { QuizQuestionOption } from './quiz-question-option.model';
import { QuizQuestion } from './quiz-question.model';

@Entity()
export class QuizAttemptAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizAttempt, (attempt) => attempt.answers)
  attempt: QuizAttempt;

  @ManyToOne(() => QuizQuestion)
  question: QuizQuestion;

  @ManyToOne(() => QuizQuestionOption)
  option: QuizQuestionOption;
}
