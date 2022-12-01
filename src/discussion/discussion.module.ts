import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscussionQuestion } from '../models/discussion-question.model';
import { DiscussionQuestionReply, Notification } from '../models';
import { PusherModule } from '../pusher/pusher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiscussionQuestion,
      DiscussionQuestionReply,
      Notification,
    ]),
    PusherModule,
  ],
  controllers: [DiscussionController],
  providers: [DiscussionService],
})
export class DiscussionModule {}
