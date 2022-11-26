import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { QuizAttemptService } from './quiz-attempt.service';

@UseGuards(JwtGuard)
@Controller('quiz-attempt')
export class QuizAttemptController {
  constructor(private readonly quizAttemptService: QuizAttemptService) {}

  @Get(':id')
  async getQuizAttemptById(
    @GetUser('id') userId: number,
    @Param('id') attemptId: string,
  ) {
    return this.quizAttemptService.getQuizAttemptById(userId, attemptId);
  }
}
