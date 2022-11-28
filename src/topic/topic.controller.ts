import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async getTopics() {
    return this.topicService.getTopics();
  }

  @UseGuards(JwtGuard)
  @Get('progress')
  async getTopicsWithProgress(@GetUser('id') userId: number) {
    return this.topicService.getTopicsWithProgress(userId);
  }

  @Get(':id')
  async getTopicById(@Param('id') id: string) {
    return this.topicService.getTopicById(id);
  }
}
