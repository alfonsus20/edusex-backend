import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { DiscussionModule } from './discussion/discussion.module';
import { MaterialModule } from './material/material.module';
import { NotificationModule } from './notification/notification.module';
import { ProfileModule } from './profile/profile.module';
import { PsikologModule } from './psikolog/psikolog.module';
import { PusherModule } from './pusher/pusher.module';
import { PusherService } from './pusher/pusher.service';
import { QuizAttemptModule } from './quiz-attempt/quiz-attempt.module';
import { QuizModule } from './quiz/quiz.module';
import { StorageModule } from './storage/storage.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    TopicModule,
    MaterialModule,
    QuizModule,
    ChatModule,
    DiscussionModule,
    ProfileModule,
    QuizAttemptModule,
    PsikologModule,
    StorageModule,
    PusherModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PusherService],
})
export class AppModule {}
