import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { SubmitQuizDto } from './dto';
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

  @Post(':id/answer')
  submitQuizAnswers(
    @Param('id') quizId: string,
    @Body() answers: SubmitQuizDto,
    @GetUser('id') userId: number,
  ) {
    return this.quizService.submitQuizAnswers(userId, quizId, answers);
  }
}
