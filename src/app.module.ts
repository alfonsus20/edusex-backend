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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
