import { Controller, Post, Get, UseGuards, Param, Body } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionQuestionDto, ReplyDiscussionQuestionDto } from './dto';

@UseGuards(JwtGuard)
@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Post(':id/reply')
  replyQuestion(
    @GetUser('id') userId: number,
    @Param('id') questionId: string,
    @Body() dto: ReplyDiscussionQuestionDto,
  ) {
    return this.discussionService.replyQuestion(userId, questionId, dto);
  }

  @Post('create-question')
  createQuestion(
    @GetUser('id') userId: number,
    @Body() dto: CreateDiscussionQuestionDto,
  ) {
    return this.discussionService.createQuestion(userId, dto);
  }

  @Get()
  getAllQuestions() {
    return this.discussionService.getAllQuestions();
  }

  @Get('my-questions')
  getUserQuestions(@GetUser('id') userId: number) {
    return this.discussionService.getUserQuestions(userId);
  }

  @Get(':id')
  getQuestionById(@Param('id') questionId: string) {
    return this.discussionService.getQuestionById(questionId);
  }
}
