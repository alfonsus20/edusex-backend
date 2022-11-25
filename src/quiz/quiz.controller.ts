import { Controller, Get, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { QuizService } from './quiz.service';

@UseGuards(JwtGuard)
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get(':id')
  getQuizById(@GetUser('id') userId: number, @Param('id') quizId: string) {
    return this.quizService.getQuizById(userId, quizId);
  }

  @Get(':id/questions')
  getQuizQuestions(@Param('id') quizId: string) {
    return this.quizService.getQuizQuestions(quizId);
  }
}
