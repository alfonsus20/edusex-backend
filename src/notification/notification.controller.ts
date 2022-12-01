import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { NotificationService } from './notification.service';

@UseGuards(JwtGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/')
  getAllNotifications(@GetUser('id') userId: number) {
    return this.notificationService.getAllNotifications(userId);
  }

  @Get('/read-all')
  markAllNotificationAsRead(@GetUser('id') userId: number) {
    return this.notificationService.markAllNotificationAsRead(userId);
  }

  @Get('/:id/read')
  readNotification(
    @GetUser('id') userId: number,
    @Param('id') notificationId: string,
  ) {
    return this.notificationService.readNotification(userId, notificationId);
  }
}
