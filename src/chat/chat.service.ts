import { Injectable, HttpStatus } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from '../models/chat-message.model';
import { ChatRoom } from '../models/chat-room.model';
import { PusherService } from '../pusher/pusher.service';
import { CreateChatRoomDto, SendChatDto } from './dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
    private pusherService: PusherService,
  ) {}

  async sendChat(senderId: number, dto: SendChatDto) {
    try {
      const room = await this.chatRoomRepository.findOne({
        where: { id: dto.room_id },
        relations: { user: true, psikolog: true },
      });

      if (room.user.id === +senderId || room.psikolog.id === +senderId) {
        throw new ForbiddenException('forbidden');
      }

      const message = await this.chatMessageRepository.save({
        room: { id: dto.room_id },
        message: dto.message,
        owner: { id: senderId },
      });

      await this.chatRoomRepository.update(
        { id: dto.room_id },
        { last_message: dto.message },
      );

      const triggerFetchDetailChat = this.pusherService.trigger(
        `room-${room.id}`,
        'personal-chat',
        message,
      );

      const triggerFetchChatListUser = this.pusherService.trigger(
        `user-${room.user.id}`,
        'fetch-chat-rooms',
        null,
      );

      const triggerFetchChatListPsikolog = this.pusherService.trigger(
        `user-${room.psikolog.id}`,
        'fetch-chat-rooms',
        null,
      );

      await Promise.all([
        triggerFetchChatListPsikolog,
        triggerFetchChatListUser,
        triggerFetchDetailChat,
      ]);

      return {
        statusCode: HttpStatus.OK,
        message: 'success send message',
        data: message,
      };
    } catch (error) {
      throw error;
    }
  }

  async createChatRoom(userId: number, dto: CreateChatRoomDto) {
    try {
      let room = await this.chatRoomRepository.findOne({
        where: { user: { id: userId }, psikolog: { id: dto.psikolog_id } },
      });

      if (!room) {
        room = await this.chatRoomRepository.save({
          user: { id: userId },
          psikolog: { id: dto.psikolog_id },
        });
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'success create room',
        data: room,
      };
    } catch (error) {
      throw error;
    }
  }
}
