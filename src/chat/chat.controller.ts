import { Controller, Post, UseGuards, Body, Get, Param } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { User } from '../models';
import { ChatService } from './chat.service';
import { CreateChatRoomDto, SendChatDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('chat')
@ApiTags('Personal Chat Consultation')
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('rooms')
  @ApiOperation({ summary: 'Chat Rooms' })
  getChatRooms(@GetUser('id') userId: number) {
    return this.chatService.getChatRooms(userId);
  }

  @Get('rooms/:id')
  @ApiOperation({ summary: 'Chat Rooms Detail (Chat Item List)' })
  getChatDetail(@GetUser('id') userId: number, @Param('id') roomId: string) {
    return this.chatService.getChatDetail(userId, roomId);
  }

  @Post()
  @ApiOperation({ summary: 'Send Message' })
  sendChat(@GetUser() sender: User, @Body() dto: SendChatDto) {
    return this.chatService.sendChat(sender, dto);
  }

  @Post('create-room')
  @ApiOperation({ summary: 'Create New Chat Room' })
  createChatRoom(
    @GetUser('id') userId: number,
    @Body() dto: CreateChatRoomDto,
  ) {
    return this.chatService.createChatRoom(userId, dto);
  }
}
