import { Controller } from '@nestjs/common';
import { QuizAttemptService } from './quiz-attempt.service';

@Controller('quiz-attempt')
export class QuizAttemptController {
  constructor(private readonly quizAttemptService: QuizAttemptService) {}
}
