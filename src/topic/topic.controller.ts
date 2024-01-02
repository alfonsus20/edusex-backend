import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { TopicService } from './topic.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('topic')
@ApiTags('Topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  // Cache for 1 day
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(24 * 60 * 60 * 1000)
  @ApiOperation({ summary: 'All Topics' })
  async getTopics() {
    return this.topicService.getTopics();
  }

  @UseGuards(JwtGuard)
  @Get('progress')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Progress for Each Topic' })
  async getTopicsWithProgress(@GetUser('id') userId: number) {
    return this.topicService.getTopicsWithProgress(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Topic Detail' })
  async getTopicById(@Param('id') id: string) {
    return this.topicService.getTopicById(id);
  }
}
