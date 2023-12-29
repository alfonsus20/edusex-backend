import { Controller, Post, Get, UseGuards, Param, Body } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { User } from '../models';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionQuestionDto, ReplyDiscussionQuestionDto } from './dto';

@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @UseGuards(JwtGuard)
  @Post(':id/reply')
  replyQuestion(
    @GetUser() user: User,
    @Param('id') questionId: string,
    @Body() dto: ReplyDiscussionQuestionDto,
  ) {
    return this.discussionService.replyQuestion(user, questionId, dto);
  }

  @UseGuards(JwtGuard)
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

  @UseGuards(JwtGuard)
  @Get('my-questions')
  getUserQuestions(@GetUser('id') userId: number) {
    return this.discussionService.getUserQuestions(userId);
  }

  @Get(':id')
  getQuestionById(@Param('id') questionId: string) {
    return this.discussionService.getQuestionById(questionId);
  }
}
