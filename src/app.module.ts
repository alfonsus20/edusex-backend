import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TopicModule } from './topic/topic.module';
import { MaterialModule } from './material/material.module';
import { QuizModule } from './quiz/quiz.module';
import { ChatModule } from './chat/chat.module';
import { DiscussionModule } from './discussion/discussion.module';
import { ProfileModule } from './profile/profile.module';
import { QuizAttemptModule } from './quiz-attempt/quiz-attempt.module';
import { PsikologModule } from './psikolog/psikolog.module';
import { StorageModule } from './storage/storage.module';
import { PusherService } from './pusher/pusher.service';
import { PusherModule } from './pusher/pusher.module';

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
  ],
  controllers: [AppController],
  providers: [AppService, PusherService],
})
export class AppModule {}
