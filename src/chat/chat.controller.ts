import { Controller, Post, UseGuards, Body, Get, Param } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { User } from '../models';
import { ChatService } from './chat.service';
import { CreateChatRoomDto, SendChatDto } from './dto';

@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('rooms')
  getChatRooms(@GetUser('id') userId: number) {
    return this.chatService.getChatRooms(userId);
  }

  @Get('rooms/:id')
  getChatDetail(@GetUser('id') userId: number, @Param('id') roomId: string) {
    return this.chatService.getChatDetail(userId, roomId);
  }

  @Post()
  sendChat(@GetUser() sender: User, @Body() dto: SendChatDto) {
    return this.chatService.sendChat(sender, dto);
  }

  @Post('create-room')
  createChatRoom(
    @GetUser('id') userId: number,
    @Body() dto: CreateChatRoomDto,
  ) {
    return this.chatService.createChatRoom(userId, dto);
  }
}
