import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { ChatService } from './chat.service';
import { CreateChatRoomDto, SendChatDto } from './dto';

@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  sendChat(@GetUser('id') userId: number, @Body() dto: SendChatDto) {
    return this.chatService.sendChat(userId, dto);
  }

  @Post('create-room')
  createChatRoom(
    @GetUser('id') userId: number,
    @Body() dto: CreateChatRoomDto,
  ) {
    return this.chatService.createChatRoom(userId, dto);
  }
}
