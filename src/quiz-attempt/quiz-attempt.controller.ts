import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { QuizAttemptService } from './quiz-attempt.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Quiz Attempt')
@ApiBearerAuth()
@Controller('quiz-attempt')
export class QuizAttemptController {
  constructor(private readonly quizAttemptService: QuizAttemptService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Quiz Attempt Result' })
  async getQuizAttemptById(
    @GetUser('id') userId: number,
    @Param('id') attemptId: string,
  ) {
    return this.quizAttemptService.getQuizAttemptById(userId, attemptId);
  }
}
