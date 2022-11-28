import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from '../models/chat-room.model';
import { ChatMessage } from '../models/chat-message.model';
import { PusherModule } from '../pusher/pusher.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, ChatMessage]), PusherModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
