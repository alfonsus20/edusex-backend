import { Controller, Post, Get, UseGuards, Param, Body } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { User } from '../models';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionQuestionDto, ReplyDiscussionQuestionDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('discussion')
@ApiTags('Discussion Forum')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @UseGuards(JwtGuard)
  @Post(':id/reply')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reply/Answer Question' })
  replyQuestion(
    @GetUser() user: User,
    @Param('id') questionId: string,
    @Body() dto: ReplyDiscussionQuestionDto,
  ) {
    return this.discussionService.replyQuestion(user, questionId, dto);
  }

  @UseGuards(JwtGuard)
  @Post('create-question')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ask/Create New Question' })
  createQuestion(
    @GetUser('id') userId: number,
    @Body() dto: CreateDiscussionQuestionDto,
  ) {
    return this.discussionService.createQuestion(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Forum Questions List' })
  getAllQuestions() {
    return this.discussionService.getAllQuestions();
  }

  @UseGuards(JwtGuard)
  @Get('my-questions')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User Questions' })
  getUserQuestions(@GetUser('id') userId: number) {
    return this.discussionService.getUserQuestions(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Discussion Detail' })
  getQuestionById(@Param('id') questionId: string) {
    return this.discussionService.getQuestionById(questionId);
  }
}
