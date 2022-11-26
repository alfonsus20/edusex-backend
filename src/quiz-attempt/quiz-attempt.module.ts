import { Module } from '@nestjs/common';
import { QuizAttemptService } from './quiz-attempt.service';
import { QuizAttemptController } from './quiz-attempt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAttempt } from '../models';

@Module({
  imports: [TypeOrmModule.forFeature([QuizAttempt])],
  controllers: [QuizAttemptController],
  providers: [QuizAttemptService],
})
export class QuizAttemptModule {}
