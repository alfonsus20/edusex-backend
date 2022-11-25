import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async getTopics() {
    return this.topicService.getTopics();
  }

  @Get(':id')
  async getTopicById(@Param('id') id: string) {
    return this.topicService.getTopicById(id);
  }

  @UseGuards(JwtGuard)
  @Get('progress')
  async getTopicsWithProgress() {
    return this.topicService.getTopicsWithProgress();
  }
}
