import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../models/quiz.model';
import { QuizAttemptAnswer, QuizQuestion } from '../models';
import { QuizQuestionOption } from '../models/quiz-question-option.model';
import { QuizAttempt } from '../models/quiz-attempt.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz,
      QuizQuestion,
      QuizQuestionOption,
      QuizAttempt,
      QuizAttemptAnswer,
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
