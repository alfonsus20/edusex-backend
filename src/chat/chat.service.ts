import { Injectable, HttpStatus } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { NotificationType } from '../enum';
import { Notification, User } from '../models';
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
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private pusherService: PusherService,
  ) {}

  async sendChat(sender: User, dto: SendChatDto) {
    try {
      const room = await this.chatRoomRepository.findOne({
        where: { id: dto.room_id },
        relations: { user: true, psikolog: true },
      });

      if (room.user.id !== +sender.id && room.psikolog.id !== +sender.id) {
        throw new ForbiddenException('forbidden');
      }

      const receiver = sender.id === room.user.id ? room.psikolog : room.user;

      const message = await this.chatMessageRepository.save({
        room: { id: dto.room_id },
        message: dto.message,
        owner: { id: sender.id },
      });

      await this.chatRoomRepository.update(
        { id: dto.room_id },
        { last_message: dto.message },
      );

      await this.notificationRepository.save({
        content: `Pesan personal baru dari ${sender.name}`,
        user: { id: receiver.id },
        type: NotificationType.PERSONAL_CHAT,
      });

      const triggerFetchDetailChat = this.pusherService.trigger(
        `room-${room.id}`,
        'personal-chat',
        message,
      );

      const triggerFetchChatList = this.pusherService.trigger(
        [`user-${room.user.id}`, `user-${room.psikolog.id}`],
        'fetch-chat-rooms',
        null,
      );

      const triggerFetchNotification = this.pusherService.trigger(
        `user-${receiver.id}`,
        'notification-received',
        null,
      );

      await Promise.all([
        triggerFetchDetailChat,
        triggerFetchChatList,
        triggerFetchNotification,
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

  async getChatRooms(userId: number) {
    try {
      const rooms = await this.chatRoomRepository
        .createQueryBuilder('room')
        .leftJoinAndSelect('room.user', 'user')
        .leftJoinAndSelect('room.psikolog', 'psikolog')
        .loadRelationCountAndMap(
          'room.unread_chats',
          'room.messages',
          'message',
          (qb) =>
            qb
              .where('message.is_read IS FALSE')
              .andWhere('message.owner.id != :userId', { userId }),
        )
        .where('psikolog.id = :userId', { userId })
        .orWhere('user.id = :userId', { userId })
        .orderBy('room.updated_at', 'DESC')
        .getMany();

      return {
        statusCode: HttpStatus.OK,
        message: 'success get chat rooms',
        data: rooms,
      };
    } catch (error) {
      throw error;
    }
  }

  async getChatDetail(userId: number, roomId: string) {
    try {
      const room = await this.chatRoomRepository.findOneOrFail({
        where: [
          { user: { id: userId }, id: +roomId },
          { psikolog: { id: userId }, id: +roomId },
        ],
        relations: { messages: { owner: true }, user: true, psikolog: true },
        order: { messages: { created_at: 'ASC' } },
      });

      await this.chatMessageRepository.update(
        { owner: { id: Not(userId) }, room: { id: +roomId } },
        { is_read: true },
      );

      await this.pusherService.trigger(
        `user-${room.user.id}`,
        'fetch-chat-rooms',
        null,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'success get chat detail',
        data: room,
      };
    } catch (error) {
      throw error;
    }
  }
}
