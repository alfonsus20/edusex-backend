import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { NotificationService } from './notification.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('notification')
@ApiTags('Notification')
@ApiBearerAuth()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/')
  @ApiOperation({ summary: 'All Notifications' })
  getAllNotifications(@GetUser('id') userId: number) {
    return this.notificationService.getAllNotifications(userId);
  }

  @Get('/read-all')
  @ApiOperation({ summary: 'Mark All Notifications as Read' })
  markAllNotificationAsRead(@GetUser('id') userId: number) {
    return this.notificationService.markAllNotificationAsRead(userId);
  }

  @Get('/:id/read')
  @ApiOperation({ summary: 'Mark a Notification as Read' })
  readNotification(
    @GetUser('id') userId: number,
    @Param('id') notificationId: string,
  ) {
    return this.notificationService.readNotification(userId, notificationId);
  }
}
